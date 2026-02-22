# ISO 20022 XML Payment Validator

Browser-based ISO 20022 XML validator. No server, no dependencies. Paste or upload XML, get instant structured feedback.

## Who this is for

Payments engineers, fintech developers, and bank integration teams testing ISO 20022 message construction before hitting a live endpoint.

## Why it exists

Most validators are either paywalled enterprise tools or require running a Java/Spring stack locally. This runs in your browser tab.

## Supported Message Types

| Type | Description |
|------|-------------|
| `pacs.008.001` | FI to FI Customer Credit Transfer |
| `pain.001.001` | Customer Credit Transfer Initiation |
| `pacs.002.001` | FI to FI Payment Status Report |
| `camt.053.001` | Bank to Customer Statement |
| `camt.054.001` | Bank to Customer Debit/Credit Notification |
| `pacs.004.001` | Payment Return |
| `pacs.009.001` | FI to FI Financial Institution Credit Transfer |

## What gets validated

- **Mandatory fields** &mdash; checks all required elements exist and are non-empty
- **Code values** &mdash; validates against allowed ISO 20022 code lists (settlement methods, charge bearers, transaction statuses, etc.)
- **Format rules** &mdash; max length, decimal amounts, currency attributes, date/datetime patterns
- **IBAN** &mdash; format check + mod-97 checksum + country-specific length validation
- **BIC/SWIFT** &mdash; 8 or 11 character pattern validation
- **Currency** &mdash; ISO 4217 active currency code validation
- **Date/DateTime** &mdash; ISO 8601 format and calendar validity

## Usage

Serve with any static HTTP server:

```bash
cd iso20022-validator
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

> **Note:** ES6 modules require a local server. Opening `index.html` directly via `file://` will not work due to browser CORS restrictions.

## Adding a new message type

1. Create `schemas/yourtype.js` following the pattern in existing schema files
2. Export a rules object with `messageType`, `rootElement`, `namespace`, `mandatoryPaths`, `codeValues`, `formatRules`, and `extractionMap`
3. Add a sample XML file to `samples/`
4. Import the schema in `index.html` and add it to `schemaRegistry`
5. Add an `<option>` to the message type dropdown

## Tech Stack

| Layer | Choice |
|-------|--------|
| UI Framework | [UIKit 3](https://getuikit.com) |
| Fonts | IBM Plex Sans + IBM Plex Mono |
| XML Parsing | Browser-native DOMParser |
| Schema Validation | Custom JS rule engine (ES6 modules) |
| Syntax Highlighting | highlight.js (CDN) |

No Node.js. No npm. No build step.

## License

MIT

---

`iso20022` `swift` `payments` `fintech` `banking` `xml-validator` `pacs008` `pain001` `open-banking`
