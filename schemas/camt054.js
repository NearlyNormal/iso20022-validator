export const camt054Rules = {
  messageType: 'camt.054.001',
  rootElement: 'BkToCstmrDbtCdtNtfctn',
  namespace: 'urn:iso:std:iso:20022:tech:xsd:camt.054.001.08',
  description: 'Bank to Customer Debit Credit Notification',
  mandatoryPaths: [
    'GrpHdr/MsgId',
    'GrpHdr/CreDtTm',
    'Ntfctn/Id',
    'Ntfctn/Acct/Id',
    'Ntfctn/Ntry/Amt',
    'Ntfctn/Ntry/CdtDbtInd',
    'Ntfctn/Ntry/Sts/Cd',
  ],
  codeValues: {
    'Ntfctn/Ntry/CdtDbtInd': ['CRDT', 'DBIT'],
    'Ntfctn/Ntry/Sts/Cd': ['BOOK', 'PDNG', 'INFO'],
  },
  formatRules: [
    { path: 'GrpHdr/MsgId', maxLength: 35 },
    { path: 'GrpHdr/CreDtTm', type: 'ISODateTime' },
    { path: 'Ntfctn/Ntry/Amt', type: 'ActiveOrHistoricCurrencyAndAmount', attribute: 'Ccy' },
  ],
  extractionMap: {
    'Message ID': 'GrpHdr/MsgId',
    'Creation Date': 'GrpHdr/CreDtTm',
    'Notification ID': 'Ntfctn/Id',
    'Account ID': 'Ntfctn/Acct/Id/IBAN',
    'Entry Amount': 'Ntfctn/Ntry/Amt',
    'Entry Currency': 'Ntfctn/Ntry/Amt@Ccy',
    'Credit/Debit': 'Ntfctn/Ntry/CdtDbtInd',
    'Entry Status': 'Ntfctn/Ntry/Sts/Cd',
  },
};
