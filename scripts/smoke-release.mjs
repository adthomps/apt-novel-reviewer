// Exercise the packaged preload, native SQLite and migrations from a non-repo cwd.
// Run on Windows after release:dir; this launches a temporary application window.
import { spawn } from "node:child_process";
import { setTimeout as wait } from "node:timers/promises";
import path from "node:path";
import os from "node:os";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
const root = path.resolve(import.meta.dirname, "..");
const executable = path.resolve(process.argv.slice(2).find(value => !value.startsWith("--")) ?? path.join(root, "release/win-unpacked/APT-Novel-Reviewer.exe"));
const fixture = path.join(root, "test-data/sample-manuscript-20260330-204831.docx");
const port = 9337;
const child = spawn(executable, [`--remote-debugging-port=${port}`, "--remote-debugging-address=127.0.0.1"], { cwd: os.tmpdir(), windowsHide: true, stdio: "pipe" });
let stderr = "";
child.stderr.on("data", data => { stderr += data; });
child.on("error", error => { stderr += error.message; });
let socket;
let projectId;
let id = 0;
const pending = new Map();
const send = (method, params = {}, timeoutMs = 15000) => new Promise((resolve, reject) => {
  const requestId = ++id;
  const timeout = setTimeout(() => { pending.delete(requestId); reject(new Error(`CDP timed out: ${method}`)); }, timeoutMs);
  pending.set(requestId, { resolve: value => { clearTimeout(timeout); resolve(value); }, reject });
  socket.send(JSON.stringify({ id: requestId, method, params }));
});
const evaluate = async (expression, timeoutMs) => {
  const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }, timeoutMs);
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
};
try {
  let page;
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json`);
      page = (await response.json()).find(target => target.type === "page" && target.url.startsWith("file:"));
      if (page) break;
    } catch { /* Wait for the packaged renderer. */ }
    await wait(500);
  }
  assert.ok(page, `Packaged renderer did not open. ${stderr}`);
  socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
  socket.addEventListener("message", event => {
    const message = JSON.parse(event.data);
    const request = pending.get(message.id);
    if (request) { pending.delete(message.id); if (message.error) request.reject(new Error(message.error.message)); else request.resolve(message.result); }
  });
  await send("Runtime.enable");
  for (let attempt = 0; attempt < 30; attempt++) {
    if (await evaluate('Boolean(window.aptApi && document.body.innerText.includes("Install Ollama"))')) break;
    await wait(200);
  }
  assert.ok(await evaluate('document.body.innerText.toLowerCase().includes("download review model")'), `Setup steps not rendered: ${JSON.stringify(await evaluate('({body:document.body.innerText,api:Boolean(window.aptApi),url:location.href})'))}\n${stderr}`);
  const status = await evaluate("window.aptApi.runtime.getStatus()");
  assert.equal(status.requiredModel, "gpt-oss:20b");
  assert.equal((await evaluate("window.aptApi.runtime.getPullStatus()")).state, "idle");
  const previousProjectId = process.argv.find(value => value.startsWith("--verify="))?.slice("--verify=".length);
  if (previousProjectId) {
    const previous = await evaluate(`window.aptApi.projects.get(${JSON.stringify(previousProjectId)})`);
    assert.ok(previous, "Previously saved project was not retained.");
    assert.ok(previous.name.startsWith("Packaged smoke test "), "Refusing to delete a non-test project.");
    const versions = await evaluate(`window.aptApi.versions.list(${JSON.stringify(previousProjectId)})`);
    assert.ok(versions.length, "Previously imported version was not retained.");
    assert.ok((await evaluate(`window.aptApi.versions.chapters(${JSON.stringify(versions[0].id)})`)).length, "Chapters were not retained.");
    await evaluate(`window.aptApi.projects.delete(${JSON.stringify(previousProjectId)})`);
    console.log(JSON.stringify({ persistedProject: "passed" }));
  }
  const project = await evaluate(`window.aptApi.projects.create(${JSON.stringify({ name: `Packaged smoke test ${randomUUID()}`, description: "Temporary validation project" })})`);
  projectId = project.id;
  assert.ok(projectId);
  const imported = await evaluate(`window.aptApi.imports.importDocx(${JSON.stringify(projectId)}, ${JSON.stringify(fixture)})`);
  assert.equal(imported.status, "imported");
  const chapters = await evaluate(`window.aptApi.versions.chapters(${JSON.stringify(imported.versionId)})`);
  assert.ok(chapters.length > 0);
  assert.ok((await evaluate("window.aptApi.projects.list()")).some(value => value.id === projectId));
  if (process.argv.includes("--review")) {
    assert.equal(status.state, "ready", "Install Ollama and the required model before the optional real review test.");
    const result = await evaluate(`window.aptApi.reviews.start(${JSON.stringify({ projectId, versionId: imported.versionId, reviewType: "chapter_review", chapterId: chapters[0].id })})`, 360000);
    assert.ok(["success", "partial"].includes(result.status), JSON.stringify(result));
    console.log(JSON.stringify({ localReview: "passed", findingCount: result.findingCount }));
  }
  console.log(JSON.stringify({ packagedLaunch: "passed", preload: "passed", sqliteMigrations: "passed", docxImport: "passed", chapters: chapters.length, runtime: status.state, retainedProjectId: process.argv.includes("--keep") ? projectId : undefined }));
} finally {
  if (projectId && !process.argv.includes("--keep") && socket?.readyState === WebSocket.OPEN) await evaluate(`window.aptApi.projects.delete(${JSON.stringify(projectId)})`).catch(console.error);
  if (socket?.readyState === WebSocket.OPEN) await send("Browser.close", {}, 1000).catch(() => undefined);
  socket?.close();
  if (child.exitCode === null) child.kill();
}
