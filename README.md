# ISO 20022 XML Payment Validator

## The problem

Banks and financial institutions worldwide are migrating to [ISO 20022](https://www.iso20022.org/), a universal standard for how payment messages are structured. Every wire transfer, direct debit, and bank statement will eventually use this format. The messages are XML files with strict rules about what fields are required, what values are allowed, and how data should be formatted.

The standard organises messages into families by function:

- **pain** (Payments Initiation) — customer-initiated messages: credit transfers, direct debits, status reports between a customer and their bank
- **pacs** (Payments Clearing and Settlement) — FI-to-FI messages: the interbank instructions that move money between financial institutions
- **camt** (Cash Management) — reporting and investigation: account statements, notifications, balance reports, and exception handling

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

The 11 message types we support are a solid starting set but only scratch the surface. ISO 20022 has **hundreds** of message types across multiple business domains.

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

In practice, the 11 we have cover the **most commonly validated payment flows** — which is what banks and fintechs typically need for testing. The tool is designed to be extensible (adding a new type is just a schema object + sample XML), so you could add more over time if needed.

## What matters in practice

A "valid" ISO 20022 message can still be rejected. There are three layers of validation between your XML and a successful payment, and most real-world rejections happen at layers 2 and 3 — not layer 1. Understanding this hierarchy is essential for anyone building or debugging payment integrations.

### Layer 1: Base message definition

This is structural validity — does the XML conform to the ISO 20022 message definition? Mandatory fields present, code values from the right lists, IBANs and BICs correctly formatted, amounts with the right decimal precision. **This is what this tool validates.** Passing layer 1 means the message is well-formed and structurally correct, but it does not guarantee acceptance by any specific payment scheme or bank.

### Layer 2: Scheme and market practice rules

This is where "optional" becomes "mandatory." Payment schemes layer additional rules on top of the base ISO definition, and these rules vary by scheme:

- **SEPA CORE vs SEPA B2B** — both use `pain.008` for direct debits, but they have different acceptance rules, mandate handling requirements, and settlement timelines. A message valid for CORE may be rejected under B2B rules and vice versa.
- **UK BACS, Canadian PAD** — different identifier requirements and mandate conventions. A SEPA-valid direct debit is meaningless in these schemes.
- **Mandate lifecycle sequencing** — `FRST` (first), `RCUR` (recurring), `OOFF` (one-off), `FNAL` (final) are not just valid code values — they must follow correct sequencing. Sending `FRST` twice for the same mandate triggers rejection. This is behavioural, not just structural.
- **Creditor Scheme Identification** — mandatory in SEPA direct debit, optional in base ISO. Country-specific formatting (e.g., `DE98ZZZ09999999999` for Germany). Missing or malformed Creditor ID is one of the most common SEPA rejection reasons.
- **Remittance information** — some schemes mandate structured remittance (`Strd`), others accept unstructured (`Ustrd`) with bank-specific length limits. Getting this wrong means the payment goes through but the beneficiary can't reconcile it.

### Layer 3: Bank implementation guides

Individual banks impose "house rules" on top of scheme requirements — and these are the most frustrating source of rejections because they're often undocumented or buried in PDF implementation guides:

- **Version pinning** — your bank expects `pain.001.001.03` but you're sending `.09`. Both are valid ISO 20022, but the bank's gateway rejects the newer version.
- **Element rejection** — banks reject optional elements they haven't implemented. Your message includes `<RgltryRptg>` because the schema allows it, but the bank's parser chokes on it.
- **Proprietary code lists** — some banks extend or restrict code lists with proprietary values not in the ISO standard.
- **Channel-specific requirements** — SWIFT FIN wrappers, app headers, or batch envelope structures that differ depending on whether you're submitting via file upload, API, or SWIFT network.

### Where this tool fits

This tool validates **layer 1** thoroughly — base message structure, mandatory fields, code lists, IBAN/BIC checksums, format rules. It also supports **layer 2** through profile overlays: you can select a scheme profile (e.g., SEPA Core Direct Debit) and the validator will check scheme-specific mandatory fields, restricted code values, and additional format rules on top of the base schema. Layer 3 is inherently bank-specific and not something a generic tool can cover — but layers 1 and 2 together catch the majority of codifiable errors.

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

## Architecture

```
iso20022-validator/
├── index.html              Entry point — open this in your browser
├── assets/
│   ├── style.css           All application styles
│   ├── app.js              Validation engine, schemas, samples, UI logic
│   ├── validate.svg        Icon assets used in the interface
│   ├── load.svg
│   ├── upload.svg
│   ├── info.svg
│   ├── actions.svg
│   ├── copy.svg
│   ├── compare.svg
│   └── export.svg
├── schemas/                Reference schema definitions (one JS file per message type)
├── samples/                Reference sample XML files (one per message type)
└── README.md
```

`assets/app.js` contains the schema registry, sample XML data, validation engine, and all UI wiring. Schemas and samples are inlined into this file so the tool works by simply opening `index.html` — no server needed. The `schemas/` and `samples/` folders are kept as standalone reference files but are not loaded at runtime.

## Adding a new message type

1. Add a schema entry to `schemaRegistry` in `assets/app.js` with `messageType`, `rootElement`, `namespace`, `mandatoryPaths`, `codeValues`, `formatRules`, and `extractionMap`
2. Add a sample XML string to `sampleXMLData` in the same file
3. Add a dropdown `<li>` in `index.html` and the mapping to `sampleFileMap`

### Adding a scheme profile

Profiles overlay the base schema — they add constraints, never remove them.

1. Add a profile entry to `profileRegistry` in `assets/app.js` with a key in the format `baseType+PROFILE_NAME` (e.g., `pain.008+SEPA_CORE`)
2. Define `baseSchema` (which schema key this profile applies to), `name`, `description`, `additionalMandatory` (paths that become mandatory under this scheme), `restrictedCodes` (narrower code lists), and `additionalFormatRules`
3. Add a corresponding `<option>` to the `#profile-select` dropdown in `index.html` with a `data-base` attribute matching the base schema key

## Tech stack

Vanilla HTML, CSS, and JavaScript. Browser-native `DOMParser` for XML parsing. No Node.js, no npm, no build step, no server.

## Further reading

- [ISO 20022 — Official site](https://www.iso20022.org/) — the standard's home, with the full message catalogue and business justification
- [ISO 20022 Message Definitions](https://www.iso20022.org/iso-20022-message-definitions) — browse every message type by business domain
- [ISO 20022 Catalogue of Messages](https://www.iso20022.org/catalogue-messages/additional-content-messages/iso-20022-message-definitions-full-catalogue) — full downloadable catalogue with XSD schemas
- [SWIFT ISO 20022 Programme](https://www.swift.com/standards/iso-20022) — SWIFT's migration timeline and adoption guides
- [SWIFT MyStandards](https://www.swift.com/our-solutions/compliance-and-shared-services/swift-mystandards) — community-maintained usage guidelines and market practice rules

## License

MIT

---

`iso20022` `swift` `payments` `fintech` `banking` `xml-validator` `pacs008` `pain001` `open-banking`
