Now, the supported message types have a very strange listing: it's Pax, then Pain, then Camt, then Pain, then Pax. Let's please order it in such a way that table that it looks like these are together. # ISO 20022 XML Payment Validator

## The problem

Banks and financial institutions worldwide are migrating to [ISO 20022](https://www.iso20022.org/), a universal standard for how payment messages are structured. Every wire transfer, direct debit, and bank statement will eventually use this format. The messages are XML files with strict rules about what fields are required, what values are allowed, and how data should be formatted.

The standard organises messages into families by function:

- **pain** (Payments Initiation): customer-initiated messages: credit transfers, direct debits, status reports between a customer and their bank
- **pacs** (Payments Clearing and Settlement): FI-to-FI messages: the interbank instructions that move money between financial institutions
- **camt** (Cash Management): reporting and investigation: account statements, notifications, balance reports, and exception handling

Getting these messages wrong means failed payments, rejected transactions, and delays that cost real money. Today, the tools available to check these messages before sending them are either expensive enterprise software or require setting up complex development environments. A payments engineer at a small bank or fintech startup faces the same XML formatting requirements as JPMorgan, but without the same tooling budget.

## What this tool does

This is a free, browser-based validator for ISO 20022 XML payment messages. Paste your XML, select a scheme profile, and get instant feedback: which fields are missing, which codes are invalid, and whether your IBANs and BICs are correctly formatted. No software to install, no server to run, no account to create.

It helps teams at banks of any size, payment processors, and fintech companies catch formatting errors before messages reach production systems, whether you're building a new integration, debugging a failed payment, or training staff on the ISO 20022 format.

## What matters in practice

A valid ISO 20022 message can still be rejected. There are three layers of validation between your XML and a successful payment:

- **Layer 1: Base message structure.** Does the XML conform to the ISO 20022 message definition? Mandatory fields present, code values from the right lists, IBANs and BICs correctly formatted, amounts with the right decimal precision. Passing layer 1 means the message is well-formed and structurally correct, but it does not guarantee acceptance by any specific payment scheme or bank.
- **Layer 2: Scheme and market practice rules.** Payment schemes layer additional rules on top of the base definition. "Optional" fields become mandatory. Code lists get narrower. Rules vary by scheme: SEPA, CHAPS, Fedwire, CBPR+ each have their own requirements.
- **Layer 3: Bank implementation guides.** Individual banks impose house rules on top of scheme requirements. Version pinning, element rejection, proprietary code lists, channel-specific envelope structures. These are often undocumented or buried in PDF guides.

Most real-world rejections happen at layers 2 and 3, not layer 1. **This tool covers Layer 1 and Layer 2.** Select a scheme profile (SEPA Core, SWIFT CBPR+, UK CHAPS, US Fedwire, Canadian PAD, and others) to check scheme-specific mandatory fields and restricted code values on top of the base schema. Layer 3 is inherently bank-specific and not something a generic tool can cover.

---

## Message types and coverage

ISO 20022 organises payment messages into three families:

- **camt** (Cash Management): account statements, balance reports, notifications, and investigation handling
- **pacs** (Payments Clearing and Settlement): the interbank instructions that move money between financial institutions
- **pain** (Payments Initiation): customer-to-bank messages for credit transfers, direct debits, and status reports

### Supported (11 message types)

| Type | Description |
|------|-------------|
| `camt.052.001` | Bank to Customer Account Report (Intraday) |
| `camt.053.001` | Bank to Customer Statement |
| `camt.054.001` | Bank to Customer Debit/Credit Notification |
| `pacs.002.001` | FI to FI Payment Status Report |
| `pacs.004.001` | Payment Return |
| `pacs.008.001` | FI to FI Customer Credit Transfer |
| `pacs.009.001` | FI to FI Financial Institution Credit Transfer |
| `pacs.010.001` | FI to FI Direct Debit |
| `pain.001.001` | Customer Credit Transfer Initiation |
| `pain.002.001` | Customer Payment Status Report |
| `pain.008.001` | Customer Direct Debit Initiation |

These cover the most commonly validated payment flows, which is what banks and fintechs typically need for testing. The tool is extensible: adding a new type is just a schema object and a sample XML file.

### Not yet covered

**In payments:**
- **pacs.003**: FI-to-FI Direct Debit
- **camt.056**: FI-to-FI Payment Cancellation Request
- **camt.029**: Resolution of Investigation

**Other business domains:**
- **Securities** (sese, seev, semt, setr): trade settlement, corporate actions, portfolio management
- **Trade Finance** (tsmt, tsin): letters of credit, guarantees
- **Foreign Exchange** (fxtr): FX confirmations
- **Cards** (caaa, caam, caad): card payments
- **Mandates** (pain.009-012): direct debit mandate management

ISO 20022 has hundreds of message types across these domains. This tool focuses on payments.

## What gets validated

- **Mandatory fields**: checks all required elements exist and are non-empty
- **Code values**: validates against allowed ISO 20022 code lists (settlement methods, charge bearers, transaction statuses, etc.)
- **Format rules**: max length, decimal amounts, currency attributes, date/datetime patterns
- **IBAN**: format check + mod-97 checksum + country-specific length validation
- **BIC/SWIFT**: 8 or 11 character pattern validation
- **Currency**: ISO 4217 active currency code validation
- **Date/DateTime**: ISO 8601 format and calendar validity

## Usage

Just open `index.html` in your browser. That's it. No server required.

## Architecture

```
iso20022-validator/
├── index.html              Entry point, open this in your browser
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

`assets/app.js` contains the schema registry, sample XML data, validation engine, and all UI wiring. Schemas and samples are inlined into this file so the tool works by simply opening `index.html`. No server needed. The `schemas/` and `samples/` folders are kept as standalone reference files but are not loaded at runtime.

## Adding a new message type

1. Add a schema entry to `schemaRegistry` in `assets/app.js` with `messageType`, `rootElement`, `namespace`, `mandatoryPaths`, `codeValues`, `formatRules`, and `extractionMap`
2. Add a sample XML string to `sampleXMLData` in the same file
3. Add a dropdown `<li>` in `index.html` and the mapping to `sampleFileMap`

### Adding a scheme profile

Profiles overlay the base schema. They add constraints, never remove them.

1. Add a profile entry to `profileRegistry` in `assets/app.js` with a key in the format `baseType+PROFILE_NAME` (e.g., `pain.008+SEPA_CORE`)
2. Define `baseSchema` (which schema key this profile applies to), `name`, `description`, `additionalMandatory` (paths that become mandatory under this scheme), `restrictedCodes` (narrower code lists), and `additionalFormatRules`
3. Add a corresponding `<option>` to the `#profile-select` dropdown in `index.html` with a `data-base` attribute matching the base schema key

## Tech stack

Vanilla HTML, CSS, and JavaScript. Browser-native `DOMParser` for XML parsing. No Node.js, no npm, no build step, no server.

## Scheme profile coverage

The table below shows which Layer 2 profiles are currently implemented and which are on the roadmap. Layer 3 (bank-specific house rules) is inherently per-institution and outside the scope of a generic open-source tool.

### Currently implemented

| Profile | Base message | Description |
|---------|-------------|-------------|
| **Europe: SEPA** | | |
| SEPA Core Direct Debit | pain.008 | EPC Core Direct Debit rulebook |
| SEPA B2B Direct Debit | pain.008 | EPC Business-to-Business Direct Debit rulebook |
| SEPA Credit Transfer | pacs.008 | EPC Credit Transfer rulebook |
| SEPA Instant Credit Transfer | pacs.008 | EPC SCT Inst rulebook |
| **Cross-border** | | |
| SWIFT CBPR+ | pacs.008 | SWIFT Cross-Border Payments and Reporting Plus |
| **United Kingdom** | | |
| UK CHAPS | pacs.008 | Bank of England CHAPS ISO 20022 implementation |
| **United States** | | |
| US Fedwire | pacs.008 | Federal Reserve Fedwire Funds Service |
| US TCH RTP | pacs.008 | The Clearing House Real-Time Payments |
| **Canada** | | |
| Canadian PAD | pain.008 | Payments Canada Pre-Authorized Debit (Rule H1) |
| **Latin America** | | |
| Brazil SPI/Pix | pacs.008 | Central Bank of Brazil SPI instant payment scheme |
| Mexico SPEI | pacs.008 | Banco de Mexico SPEI ISO 20022 usage rules |

### Roadmap: profiles not yet implemented

These appear as disabled entries in the profile dropdown.

- **Europe**
  - SEPA COR1 (legacy, mostly retired but still seen in archives)
- **United Kingdom**
  - UK Faster Payments ISO migration profile
  - BACS Direct Debit ISO overlay
- **United States**
  - FedNow
  - NACHA ACH ISO wrappers (when available)
- **Canada**
  - Lynx (high-value, ISO-native)
  - RTR (Real-Time Rail)
- **Asia-Pacific**
  - Singapore FAST (most prevalent)
  - Singapore MEPS+
  - Australia NPP
  - India RTGS
  - India UPI ISO overlay
- **Latin America**
  - Colombia Bre-B (early-stage interoperability platform)
  - Chile TEF (early-stage migration planning)
- **Switzerland**
  - SIC ISO 20022
- **Corporate**
  - CGI-MP (Common Global Implementation Market Practice) pain.001 and pain.008 profiles for multinational corporates

Each of these schemes has its own mandatory fields, restricted code values, character set rules, and conditional logic. Contributions are welcome. Adding a profile follows the same pattern documented in "Adding a scheme profile" above.

## Further reading

- [ISO 20022 Official site](https://www.iso20022.org/): the standard's home, with the full message catalogue and business justification
- [ISO 20022 Message Definitions](https://www.iso20022.org/iso-20022-message-definitions): browse every message type by business domain
- [ISO 20022 Catalogue of Messages](https://www.iso20022.org/catalogue-messages/additional-content-messages/iso-20022-message-definitions-full-catalogue): full downloadable catalogue with XSD schemas
- [SWIFT ISO 20022 Programme](https://www.swift.com/standards/iso-20022): SWIFT's migration timeline and adoption guides
- [SWIFT MyStandards](https://www.swift.com/our-solutions/compliance-and-shared-services/swift-mystandards): community-maintained usage guidelines and market practice rules

## License

MIT

---

`iso20022` `swift` `payments` `fintech` `banking` `xml-validator` `pacs008` `pain001` `open-banking`
