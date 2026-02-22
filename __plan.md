# ISO 20022 XML Payment Validator — Implementation Plan

## Context

Building a browser-based ISO 20022 XML payment validator as a new project in `/Users/shanx/Sites/github-showcase/iso20022-validator/`. The spec is defined in `iso20022-validator.md`. Scope: all features (v1.0 through v1.2). No server, no npm, no build step — vanilla HTML/CSS/JS with ES6 modules.

---

## Phase 1: Project Skeleton & UI Shell

Create directory structure and the two-panel UI with dark-mode theming.

**Files:** `index.html`

- HTML: header (message type `<select>`, Load Sample button, Validate button, dark mode toggle), two-panel split (left: XML input textarea + syntax highlight overlay, right: validation results + extracted fields)
- CSS: custom properties on `:root` (dark default, trading-terminal aesthetic), `[data-theme="light"]` override, CSS Grid split layout, textarea/pre overlay alignment, error-line highlighting styles
- JS: dark mode toggle with `localStorage` persistence
- CDN: `highlight.js` 11.x for XML syntax coloring (with graceful fallback)

**Key detail:** Textarea overlay pattern — textarea has `color: transparent; caret-color: var(--text-primary)`, `<pre><code>` positioned behind with `pointer-events: none`. Same font/size/padding on both.

---

## Phase 2: Schema Rule Files (4 core + 3 extended)

**Files:** `schemas/pacs008.js`, `pain001.js`, `pacs002.js`, `camt053.js`, `camt054.js`, `pacs004.js`, `pacs009.js`

Each exports a rule object with:
- `messageType`, `rootElement`, `namespace`, `description`
- `mandatoryPaths[]` — paths relative to business root element
- `codeValues{}` — path → allowed code array
- `formatRules[]` — path + maxLength/type/pattern/attribute constraints
- `extractionMap{}` — human label → path (supports `path@Attr` notation)

**pacs.008** (FI-to-FI Credit Transfer): 13 mandatory paths, settlement method + charge bearer codes
**pain.001** (Customer Credit Transfer Initiation): PmtInf nesting, payment method codes
**pacs.002** (Payment Status Report): transaction status codes (ACSC, RJCT, etc.) + reason codes
**camt.053** (Bank-to-Customer Statement): balance types, credit/debit indicators
**camt.054** (Debit/Credit Notification): entry status codes — v1.2
**pacs.004** (Payment Return): return reason codes — v1.2
**pacs.009** (FI-to-FI Credit Transfer): institution-level transfers — v1.2

---

## Phase 3: Sample XML Files

**Files:** `samples/pacs008-sample.xml`, `pain001-sample.xml`, `pacs002-sample.xml`, `camt053-sample.xml`, `camt054-sample.xml`, `pacs004-sample.xml`, `pacs009-sample.xml`

Realistic, valid XML for each message type with proper namespaces, valid IBANs/BICs, and correct structure. Each should pass validation with zero errors.

---

## Phase 4: Core Validation Engine (in `index.html` script module)

1. **Schema registry** — imports all schema modules, maps message type keys to rule objects
2. **Auto-detection** — checks namespace URI and root child elements to identify message type
3. **Namespace-aware path resolver** — traverses children by `localName` (not `querySelector`, which fails with namespaces). Supports `path@Attr` notation for attribute extraction
4. **Main `validate()` function:**
   - Parse XML with `DOMParser`, check for `parsererror`
   - Detect/force schema, find business root element
   - Mandatory field check → errors
   - Code value check → errors
   - Format rule check (maxLength, ISODateTime, ISODate, decimal amounts, currency attributes) → errors
   - Extended validation (Phase 5) → errors/warnings
   - Field extraction via `extractionMap` → `result.extracted`
   - Returns `{ valid, errors[], warnings[], extracted{}, messageType }`
5. **Line finder** — maps field paths back to source line numbers for error highlighting

---

## Phase 5: v1.1 Format Validators (integrated into validation engine)

- **IBAN**: mod-97 check with country-specific length table (~70 countries)
- **BIC/SWIFT**: regex for 8 or 11 char pattern (4 bank + 2 country + 2 location + optional 3 branch)
- **Currency**: hardcoded ISO 4217 active codes (~180 entries), validated on any `Ccy` attribute
- **Date**: ISO 8601 date/datetime parsing with calendar validity check

Walk all `IBAN`, `BICFI` elements and `Ccy` attributes in the document automatically (not just schema-defined paths).

---

## Phase 6: UI Wiring & Interactions

All in `index.html` script:

- **Syntax highlighting**: highlight.js integration, textarea→pre sync on input, scroll sync
- **Validate button**: runs `validate()`, renders summary (green check / red X + count), error list (clickable, scrolls to line), extracted fields (formatted amounts, colored status badges), error line markers in highlighted XML
- **Load Sample**: fetches from `samples/` based on dropdown selection
- **File upload**: `FileReader` populates textarea
- **Copy report as JSON**: `navigator.clipboard.writeText` with structured report object
- **Auto-detect**: when dropdown is "Auto-detect", `validate()` determines type from XML

---

## Phase 7: v1.2 Features

- **Diff view**: LCS-based line diff, "Compare with Sample" button, overlay/modal with two-column colored diff (red=removed, green=added)
- **PDF export**: `window.open` + `document.write` clean report HTML + `window.print()` (browser Save as PDF)
- **New message types**: add to dropdown, schema registry, and sample loader

---

## Phase 8: README.md

One-line description, supported types table, usage (`python3 -m http.server`), how to add new types, what's validated, MIT license, GitHub tags.

---

## Implementation Order

| Step | Phase | Can Parallelize? |
|------|-------|-----------------|
| 1 | Phase 1: HTML/CSS shell | Independent |
| 2 | Phase 2: All 7 schema files | Independent (parallel with 1) |
| 3 | Phase 3: All 7 sample XMLs | After schemas |
| 4 | Phase 4: Validation engine | After schemas |
| 5 | Phase 5: v1.1 validators | After engine |
| 6 | Phase 6: UI wiring | After shell + engine + samples |
| 7 | Phase 7: v1.2 features | After UI wiring |
| 8 | Phase 8: README | After everything |

---

## Gotchas

- **Namespace handling**: `querySelector('MsgId')` won't work — must use `getElementsByTagNameNS('*', localName)` or iterate `children` by `localName`
- **ES6 modules need a server**: `file://` won't work in most browsers due to CORS. Note in README: `python3 -m http.server`
- **Textarea/pre alignment**: must match font, font-size, line-height, padding, border, box-sizing exactly
- **`parsererror` varies by browser**: `doc.querySelector('parsererror')` works cross-browser
- **Multiple transactions**: path resolver finds first match at each level — document this limitation

---

## Verification

1. Open in browser via local server
2. Load each sample → Validate → expect zero errors, all fields extracted
3. Deliberately break samples (remove mandatory fields, invalid codes, bad IBANs) → expect correct errors
4. Test file upload, copy report, dark/light toggle, PDF export
5. Test diff view against samples
6. Test all 7 message types
