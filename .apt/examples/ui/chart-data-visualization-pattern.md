---
title: Chart Data Visualization Pattern
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
kind: "example"
domain: "ui"
source_paths: ["apt-principles/examples/ui/chart-data-visualization-pattern.md"]
---

# Chart Data Visualization Pattern

## Context

APT dashboards, reports, and public proof surfaces need charts that help users compare, monitor, and decide.

## Problem

Charts often use arbitrary colors, decorative gradients, hidden axes, and unclear status signals. That makes data harder to trust and harder to review.

## APT Principles Applied

- Design: charts communicate decisions, not decoration.
- Operations: status and trends should be explainable.
- Quality: chart semantics need review evidence.
- System Standards: tokenized chart roles prevent visual drift.

## Solution

Use the chart ramp and state roles deliberately.

```text
single series: chart-1 / primary blue
second series or focused comparison: chart-2 / orange, chosen for maximum contrast with blue
additional series: chart-3, chart-4, chart-5 in order
status risk: danger, warning, success only when the data carries that status
axes and labels: muted neutral text
surface: dark card with stable dimensions
```

Every chart should include a title, metric or question, timeframe where relevant, and a short interpretation note when the visual supports a decision. Dense tables should use neutral status pills with small semantic dots rather than large colored blocks.

Use `examples/ui/design-reference-kit/preview/chart-*.html` and `examples/ui/design-reference-kit/ui_kits/dashboard/` as reference evidence.

## Example Structure

```text
Decision supported:
Chart type:
Series count:
Color roles:
Status colors:
Labels/axis treatment:
Empty/loading/error states:
Accessibility notes:
```

## Tradeoffs

Restricting chart color reduces decorative variety. It increases consistency and makes semantic color meaningful when risk, success, or warning appears.

## Common Mistakes

- Using red, amber, or success colors because a chart needs variety.
- Omitting axes, labels, units, or timeframe.
- Letting loading or empty chart states resize the dashboard.
- Using chart glow on every data element instead of a specific hero or lead trend.

## Related Documents

- `../../design.md`
- `../../operations-support.md`
- `../../references/design-tokens.json`
- `dashboard-layout-pattern.md`
- `design-reference-kit/ui_kits/dashboard/index.html`
