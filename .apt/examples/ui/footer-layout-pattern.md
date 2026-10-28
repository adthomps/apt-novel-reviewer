---
title: Footer Layout Pattern
version: v1
last_updated: 2026-04-30
owner: APT
status: draft
kind: "example"
domain: "ui"
source_paths: ["apt-principles/examples/ui/footer-layout-pattern.md"]
---

# Footer Layout Pattern

## Context

APT sites need a consistent global footer that closes the page with identity, high-value navigation, and required metadata without adding visual weight to every route.

## Problem

Footers drift when each project invents its own structure. Some become too sparse and hide useful routes; others become oversized sitemap sections that compete with page content.

## APT Principles Applied

- Design systems over screens: use one reusable footer shape across APT product and doctrine surfaces.
- Clarity over cleverness: show brand, concise description, two small link groups, and legal/support metadata.
- Structure over decoration: rely on grid, spacing, tokenized border, and muted text hierarchy.
- Consistency beats novelty: reuse the `apt-dream-to-reality` footer scale as the baseline for APT sites.

## Solution

Use this compact footer template:

```tsx
<footer className="border-t border-border/60 bg-card/55 backdrop-blur">
  <div className="container px-4 py-8 md:py-10">
    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
      <div className="md:col-span-2">
        <a className="mb-3 flex items-center gap-3">
          <AptEmblem size="sm" glow="none" className="h-8 w-8" />
          <div>
            <p className="text-sm font-semibold tracking-tight text-foreground">Product or Site</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Applied Practical Thinking</p>
          </div>
        </a>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          One concise sentence that explains the surface.
        </p>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Product</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><a className="hover:text-foreground">Home</a></li>
          <li><a className="hover:text-foreground">Workspace</a></li>
          <li><a className="hover:text-foreground">Documentation</a></li>
        </ul>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Resources</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><a className="hover:text-foreground">Start</a></li>
          <li><a className="hover:text-foreground">Examples</a></li>
          <li><a className="hover:text-foreground">Roadmap</a></li>
        </ul>
      </div>
    </div>

    <hr className="my-6 border-border/60" />

    <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-start sm:justify-between">
      <p>© 2026 APT. License or rights statement.</p>
      <p className="text-xs sm:text-right">Optional build, disclaimer, or AI-use note.</p>
    </div>
  </div>
</footer>
```

Use internal route links for project navigation and normal anchors for external resources. Keep link groups to two or three links each unless the surface has a documented information architecture need.

## Tradeoffs

The compact template is less exhaustive than a full sitemap footer. That is intentional: primary navigation, browse pages, and documentation indexes should carry discovery work; the footer should provide orientation and a small set of reliable exits.

## Common Mistakes

- Expanding the footer into multiple rows of dense links.
- Using hero-scale type, cards, nested panels, or promotional blocks inside the footer.
- Replacing the muted text hierarchy with accent-colored body copy.
- Omitting mobile stacking or using desktop-only column assumptions.
- Letting legal, disclaimer, build, and AI-use notes crowd the main brand description.

## Related Documents

- `../../design.md`
- `navigation-layout-pattern.md`
- `../../references/design-tokens.json`
