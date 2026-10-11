import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
const release = path.resolve(import.meta.dirname, "../release");
const installers = (await readdir(release)).filter(file => file.endsWith("-Setup.exe"));
if (!installers.length) throw new Error("No Windows installer found.");
for (const file of installers) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(path.join(release, file))) hash.update(chunk);
  await writeFile(path.join(release, `${file}.sha256`), `${hash.digest("hex")}  ${file}\n`);
}
