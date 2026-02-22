# ISO 20022 XML Payment Validator

## The problem

Banks and financial institutions worldwide are migrating to ISO 20022, a new standard for how payment messages are structured. Every wire transfer, direct debit, and bank statement will eventually use this format. The messages are XML files with strict rules about what fields are required, what values are allowed, and how data should be formatted.

Getting these messages wrong means failed payments, rejected transactions, and delays that cost real money. Today, the tools available to check these messages before sending them are either expensive enterprise software or require setting up complex development environments. A payments engineer at a small bank or fintech startup faces the same XML formatting requirements as JPMorgan, but without the same tooling budget.

## What this tool does

This is a free, browser-based validator. Open the HTML file, paste your XML payment message, and get instant feedback: which fields are missing, which codes are invalid, whether your IBANs and BICs are correctly formatted. No software to install, no server to run, no account to create.

It helps teams at banks of any size, payment processors, and fintech companies catch formatting errors before messages reach production systems, whether you're building a new integration, debugging a failed payment, or training staff on the ISO 20022 format.

---

## Supported Message Types

| Type | Description |
|------|-------------|
| `pacs.008.001` | FI to FI Customer Credit Transfer |
| `pain.001.001` | Customer Credit Transfer Initiation |
| `pain.002.001` | Customer Payment Status Report |
| `pacs.002.001` | FI to FI Payment Status Report |
| `camt.053.001` | Bank to Customer Statement |
| `camt.052.001` | Bank to Customer Account Report (Intraday) |
| `pain.008.001` | Customer Direct Debit Initiation |
| `pacs.010.001` | FI to FI Direct Debit |
| `camt.054.001` | Bank to Customer Debit/Credit Notification |
| `pacs.004.001` | Payment Return |
| `pacs.009.001` | FI to FI Financial Institution Credit Transfer |

## Message type coverage

The 7 message types we support are a solid starting set but only scratch the surface. ISO 20022 has **hundreds** of message types across multiple business domains.

**Notable ones we're missing in payments alone:**
- **pacs.003** — FI-to-FI Direct Debit
- **camt.056** — FI-to-FI Payment Cancellation Request
- **camt.029** — Resolution of Investigation

**Entire other business domains we don't touch:**
- **Securities (sese, seev, semt, setr)** — hundreds of messages for trade settlement, corporate actions, portfolio management
- **Trade Finance (tsmt, tsin)** — letters of credit, guarantees
- **Foreign Exchange (fxtr)** — FX confirmations
- **Cards (caaa, caam, caad)** — card payments
- **Mandates (pain.009–012)** — direct debit mandate management

In practice, the 7 we have cover the **most commonly validated payment flows** — which is what banks and fintechs typically need for testing. The tool is designed to be extensible (adding a new type is just a schema object + sample XML), so you could add more over time if needed.

## What gets validated

- **Mandatory fields** &mdash; checks all required elements exist and are non-empty
- **Code values** &mdash; validates against allowed ISO 20022 code lists (settlement methods, charge bearers, transaction statuses, etc.)
- **Format rules** &mdash; max length, decimal amounts, currency attributes, date/datetime patterns
- **IBAN** &mdash; format check + mod-97 checksum + country-specific length validation
- **BIC/SWIFT** &mdash; 8 or 11 character pattern validation
- **Currency** &mdash; ISO 4217 active currency code validation
- **Date/DateTime** &mdash; ISO 8601 format and calendar validity

## Usage

Just open `index.html` in your browser. That's it. No server required.

## Technical note

Everything is contained in a single HTML file. All validation schemas, sample XML messages, and application logic are inlined directly into `index.html`. An earlier version used ES6 `import`/`export` modules with separate schema files, but browsers block module imports over the `file://` protocol due to CORS restrictions. Inlining everything removes the need for a local HTTP server and makes the tool truly portable: download one file and open it.

The separate schema files in `schemas/` and sample files in `samples/` are kept for reference but are not loaded at runtime.

## Adding a new message type

1. Add a new entry to the `schemaRegistry` object in `index.html` with `messageType`, `rootElement`, `namespace`, `mandatoryPaths`, `codeValues`, `formatRules`, and `extractionMap`
2. Add a sample XML string to the `sampleXMLData` object
3. Add an `<option>` to the message type dropdown
4. Add the mapping to `sampleFileMap`

## Tech Stack

| Layer | Choice |
|-------|--------|
| UI Framework | [UIKit 3](https://getuikit.com) |
| Fonts | IBM Plex Sans + IBM Plex Mono |
| XML Parsing | Browser-native DOMParser |
| Schema Validation | Custom JS rule engine |
| Syntax Highlighting | highlight.js (CDN) |

No Node.js. No npm. No build step. No server.

## License

MIT

---

`iso20022` `swift` `payments` `fintech` `banking` `xml-validator` `pacs008` `pain001` `open-banking`
