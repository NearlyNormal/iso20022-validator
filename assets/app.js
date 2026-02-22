// ─── HIGHLIGHT.JS ───
var hljsAvailable = (typeof hljs !== 'undefined');

// ─── SCHEMA DEFINITIONS (inlined) ───
var schemaRegistry = {
  'pacs.008': {
    messageType: 'pacs.008.001',
    rootElement: 'FIToFICstmrCdtTrf',
    namespace: 'urn:iso:std:iso:20022:tech:xsd:pacs.008.001.08',
    description: 'FI to FI Customer Credit Transfer',
    mandatoryPaths: [
      'GrpHdr/MsgId','GrpHdr/CreDtTm','GrpHdr/NbOfTxs','GrpHdr/SttlmInf/SttlmMtd',
      'CdtTrfTxInf/PmtId/EndToEndId','CdtTrfTxInf/IntrBkSttlmAmt','CdtTrfTxInf/ChrgBr',
      'CdtTrfTxInf/Dbtr/Nm','CdtTrfTxInf/DbtrAcct/Id','CdtTrfTxInf/DbtrAgt/FinInstnId',
      'CdtTrfTxInf/Cdtr/Nm','CdtTrfTxInf/CdtrAcct/Id','CdtTrfTxInf/CdtrAgt/FinInstnId',
    ],
    codeValues: {
      'GrpHdr/SttlmInf/SttlmMtd': ['CLRG','COVE','INDA','INGA'],
      'CdtTrfTxInf/ChrgBr': ['DEBT','CRED','SHAR','SLEV'],
    },
    formatRules: [
      { path: 'GrpHdr/MsgId', maxLength: 35 },
      { path: 'GrpHdr/CreDtTm', type: 'ISODateTime' },
      { path: 'GrpHdr/NbOfTxs', pattern: /^\d{1,15}$/ },
      { path: 'CdtTrfTxInf/IntrBkSttlmAmt', type: 'ActiveCurrencyAndAmount', attribute: 'Ccy' },
      { path: 'CdtTrfTxInf/PmtId/EndToEndId', maxLength: 35 },
    ],
    extractionMap: {
      'Message ID': 'GrpHdr/MsgId','Creation Date': 'GrpHdr/CreDtTm','Transactions': 'GrpHdr/NbOfTxs',
      'Settlement Method': 'GrpHdr/SttlmInf/SttlmMtd','End-to-End ID': 'CdtTrfTxInf/PmtId/EndToEndId',
      'Amount': 'CdtTrfTxInf/IntrBkSttlmAmt','Currency': 'CdtTrfTxInf/IntrBkSttlmAmt@Ccy',
      'Charge Bearer': 'CdtTrfTxInf/ChrgBr','Debtor': 'CdtTrfTxInf/Dbtr/Nm',
      'Debtor IBAN': 'CdtTrfTxInf/DbtrAcct/Id/IBAN','Debtor BIC': 'CdtTrfTxInf/DbtrAgt/FinInstnId/BICFI',
      'Creditor': 'CdtTrfTxInf/Cdtr/Nm','Creditor IBAN': 'CdtTrfTxInf/CdtrAcct/Id/IBAN',
      'Creditor BIC': 'CdtTrfTxInf/CdtrAgt/FinInstnId/BICFI',
    },
  },

  'pain.001': {
    messageType: 'pain.001.001',
    rootElement: 'CstmrCdtTrfInitn',
    namespace: 'urn:iso:std:iso:20022:tech:xsd:pain.001.001.09',
    description: 'Customer Credit Transfer Initiation',
    mandatoryPaths: [
      'GrpHdr/MsgId','GrpHdr/CreDtTm','GrpHdr/NbOfTxs','GrpHdr/InitgPty/Nm',
      'PmtInf/PmtInfId','PmtInf/PmtMtd','PmtInf/NbOfTxs','PmtInf/ReqdExctnDt/Dt',
      'PmtInf/Dbtr/Nm','PmtInf/DbtrAcct/Id','PmtInf/DbtrAgt/FinInstnId',
      'PmtInf/CdtTrfTxInf/PmtId/EndToEndId','PmtInf/CdtTrfTxInf/Amt/InstdAmt',
      'PmtInf/CdtTrfTxInf/Cdtr/Nm','PmtInf/CdtTrfTxInf/CdtrAcct/Id',
    ],
    codeValues: {
      'PmtInf/PmtMtd': ['CHK','TRF','TRA'],
      'PmtInf/CdtTrfTxInf/ChrgBr': ['DEBT','CRED','SHAR','SLEV'],
    },
    formatRules: [
      { path: 'GrpHdr/MsgId', maxLength: 35 },
      { path: 'GrpHdr/CreDtTm', type: 'ISODateTime' },
      { path: 'PmtInf/ReqdExctnDt/Dt', type: 'ISODate' },
      { path: 'PmtInf/CdtTrfTxInf/Amt/InstdAmt', type: 'ActiveCurrencyAndAmount', attribute: 'Ccy' },
      { path: 'PmtInf/CdtTrfTxInf/PmtId/EndToEndId', maxLength: 35 },
    ],
    extractionMap: {
      'Message ID': 'GrpHdr/MsgId','Creation Date': 'GrpHdr/CreDtTm','Transactions': 'GrpHdr/NbOfTxs',
      'Initiating Party': 'GrpHdr/InitgPty/Nm','Payment Method': 'PmtInf/PmtMtd',
      'Execution Date': 'PmtInf/ReqdExctnDt/Dt','Debtor': 'PmtInf/Dbtr/Nm',
      'Debtor IBAN': 'PmtInf/DbtrAcct/Id/IBAN','End-to-End ID': 'PmtInf/CdtTrfTxInf/PmtId/EndToEndId',
      'Amount': 'PmtInf/CdtTrfTxInf/Amt/InstdAmt','Currency': 'PmtInf/CdtTrfTxInf/Amt/InstdAmt@Ccy',
      'Creditor': 'PmtInf/CdtTrfTxInf/Cdtr/Nm','Creditor IBAN': 'PmtInf/CdtTrfTxInf/CdtrAcct/Id/IBAN',
    },
  },

  'pacs.002': {
    messageType: 'pacs.002.001',
    rootElement: 'FIToFIPmtStsRpt',
    namespace: 'urn:iso:std:iso:20022:tech:xsd:pacs.002.001.10',
    description: 'FI to FI Payment Status Report',
    mandatoryPaths: [
      'GrpHdr/MsgId','GrpHdr/CreDtTm',
      'TxInfAndSts/OrgnlGrpInf/OrgnlMsgId','TxInfAndSts/OrgnlGrpInf/OrgnlMsgNmId','TxInfAndSts/TxSts',
    ],
    codeValues: {
      'TxInfAndSts/TxSts': ['ACCP','ACSC','ACSP','ACTC','ACWC','ACWP','PDNG','RCVD','RJCT','CANC'],
      'TxInfAndSts/StsRsnInf/Rsn/Cd': [
        'AC01','AC04','AC06','AG01','AG02','AM01','AM02','AM03','AM04','AM05','AM09','AM10',
        'BE01','BE04','BE05','DT01','FF01','MD01','MS02','MS03','RC01',
        'RR01','RR02','RR03','RR04','TM01',
      ],
    },
    formatRules: [
      { path: 'GrpHdr/MsgId', maxLength: 35 },
      { path: 'GrpHdr/CreDtTm', type: 'ISODateTime' },
      { path: 'TxInfAndSts/OrgnlGrpInf/OrgnlMsgId', maxLength: 35 },
    ],
    extractionMap: {
      'Message ID': 'GrpHdr/MsgId','Creation Date': 'GrpHdr/CreDtTm',
      'Original Message ID': 'TxInfAndSts/OrgnlGrpInf/OrgnlMsgId',
      'Original Message Type': 'TxInfAndSts/OrgnlGrpInf/OrgnlMsgNmId',
      'Transaction Status': 'TxInfAndSts/TxSts',
      'Status Reason Code': 'TxInfAndSts/StsRsnInf/Rsn/Cd',
      'Status Additional Info': 'TxInfAndSts/StsRsnInf/AddtlInf',
    },
  },

  'camt.053': {
    messageType: 'camt.053.001',
    rootElement: 'BkToCstmrStmt',
    namespace: 'urn:iso:std:iso:20022:tech:xsd:camt.053.001.08',
    description: 'Bank to Customer Statement',
    mandatoryPaths: [
      'GrpHdr/MsgId','GrpHdr/CreDtTm','Stmt/Id','Stmt/ElctrncSeqNb','Stmt/CreDtTm',
      'Stmt/Acct/Id','Stmt/Acct/Ccy','Stmt/Bal/Tp/CdOrPrtry/Cd','Stmt/Bal/Amt',
      'Stmt/Bal/CdtDbtInd','Stmt/Bal/Dt/Dt',
    ],
    codeValues: {
      'Stmt/Bal/CdtDbtInd': ['CRDT','DBIT'],
      'Stmt/Bal/Tp/CdOrPrtry/Cd': ['OPBD','CLBD','CLAV','FWAV','INFO','ITBD','ITAV','PRCD','XPCD'],
    },
    formatRules: [
      { path: 'GrpHdr/MsgId', maxLength: 35 },
      { path: 'GrpHdr/CreDtTm', type: 'ISODateTime' },
      { path: 'Stmt/Bal/Amt', type: 'ActiveOrHistoricCurrencyAndAmount', attribute: 'Ccy' },
      { path: 'Stmt/Bal/Dt/Dt', type: 'ISODate' },
    ],
    extractionMap: {
      'Message ID': 'GrpHdr/MsgId','Creation Date': 'GrpHdr/CreDtTm','Statement ID': 'Stmt/Id',
      'Sequence Number': 'Stmt/ElctrncSeqNb','Account ID': 'Stmt/Acct/Id/IBAN',
      'Account Currency': 'Stmt/Acct/Ccy','Balance Type': 'Stmt/Bal/Tp/CdOrPrtry/Cd',
      'Balance Amount': 'Stmt/Bal/Amt','Balance Currency': 'Stmt/Bal/Amt@Ccy',
      'Credit/Debit': 'Stmt/Bal/CdtDbtInd','Balance Date': 'Stmt/Bal/Dt/Dt',
    },
  },

  'camt.054': {
    messageType: 'camt.054.001',
    rootElement: 'BkToCstmrDbtCdtNtfctn',
    namespace: 'urn:iso:std:iso:20022:tech:xsd:camt.054.001.08',
    description: 'Bank to Customer Debit Credit Notification',
    mandatoryPaths: [
      'GrpHdr/MsgId','GrpHdr/CreDtTm','Ntfctn/Id','Ntfctn/Acct/Id',
      'Ntfctn/Ntry/Amt','Ntfctn/Ntry/CdtDbtInd','Ntfctn/Ntry/Sts/Cd',
    ],
    codeValues: {
      'Ntfctn/Ntry/CdtDbtInd': ['CRDT','DBIT'],
      'Ntfctn/Ntry/Sts/Cd': ['BOOK','PDNG','INFO'],
    },
    formatRules: [
      { path: 'GrpHdr/MsgId', maxLength: 35 },
      { path: 'GrpHdr/CreDtTm', type: 'ISODateTime' },
      { path: 'Ntfctn/Ntry/Amt', type: 'ActiveOrHistoricCurrencyAndAmount', attribute: 'Ccy' },
    ],
    extractionMap: {
      'Message ID': 'GrpHdr/MsgId','Creation Date': 'GrpHdr/CreDtTm','Notification ID': 'Ntfctn/Id',
      'Account ID': 'Ntfctn/Acct/Id/IBAN','Entry Amount': 'Ntfctn/Ntry/Amt',
      'Entry Currency': 'Ntfctn/Ntry/Amt@Ccy','Credit/Debit': 'Ntfctn/Ntry/CdtDbtInd',
      'Entry Status': 'Ntfctn/Ntry/Sts/Cd',
    },
  },

  'pacs.004': {
    messageType: 'pacs.004.001',
    rootElement: 'PmtRtr',
    namespace: 'urn:iso:std:iso:20022:tech:xsd:pacs.004.001.09',
    description: 'Payment Return',
    mandatoryPaths: [
      'GrpHdr/MsgId','GrpHdr/CreDtTm','GrpHdr/NbOfTxs','GrpHdr/SttlmInf/SttlmMtd',
      'TxInf/OrgnlGrpInf/OrgnlMsgId','TxInf/OrgnlGrpInf/OrgnlMsgNmId',
      'TxInf/RtrdIntrBkSttlmAmt','TxInf/RtrRsnInf/Rsn/Cd',
    ],
    codeValues: {
      'GrpHdr/SttlmInf/SttlmMtd': ['CLRG','COVE','INDA','INGA'],
      'TxInf/RtrRsnInf/Rsn/Cd': [
        'AC01','AC04','AG01','AM04','BE04','DT01','FF01','MD01',
        'MS02','RC01','RR01','RR02','RR03','RR04','TM01',
      ],
    },
    formatRules: [
      { path: 'GrpHdr/MsgId', maxLength: 35 },
      { path: 'GrpHdr/CreDtTm', type: 'ISODateTime' },
      { path: 'GrpHdr/NbOfTxs', pattern: /^\d{1,15}$/ },
      { path: 'TxInf/RtrdIntrBkSttlmAmt', type: 'ActiveCurrencyAndAmount', attribute: 'Ccy' },
    ],
    extractionMap: {
      'Message ID': 'GrpHdr/MsgId','Creation Date': 'GrpHdr/CreDtTm','Transactions': 'GrpHdr/NbOfTxs',
      'Settlement Method': 'GrpHdr/SttlmInf/SttlmMtd',
      'Original Message ID': 'TxInf/OrgnlGrpInf/OrgnlMsgId',
      'Original Message Type': 'TxInf/OrgnlGrpInf/OrgnlMsgNmId',
      'Return Amount': 'TxInf/RtrdIntrBkSttlmAmt','Return Currency': 'TxInf/RtrdIntrBkSttlmAmt@Ccy',
      'Return Reason': 'TxInf/RtrRsnInf/Rsn/Cd',
    },
  },

  'pacs.009': {
    messageType: 'pacs.009.001',
    rootElement: 'FICdtTrf',
    namespace: 'urn:iso:std:iso:20022:tech:xsd:pacs.009.001.08',
    description: 'FI to FI Financial Institution Credit Transfer',
    mandatoryPaths: [
      'GrpHdr/MsgId','GrpHdr/CreDtTm','GrpHdr/NbOfTxs','GrpHdr/SttlmInf/SttlmMtd',
      'CdtTrfTxInf/PmtId/EndToEndId','CdtTrfTxInf/IntrBkSttlmAmt',
      'CdtTrfTxInf/Dbtr/FinInstnId','CdtTrfTxInf/Cdtr/FinInstnId',
    ],
    codeValues: {
      'GrpHdr/SttlmInf/SttlmMtd': ['CLRG','COVE','INDA','INGA'],
    },
    formatRules: [
      { path: 'GrpHdr/MsgId', maxLength: 35 },
      { path: 'GrpHdr/CreDtTm', type: 'ISODateTime' },
      { path: 'GrpHdr/NbOfTxs', pattern: /^\d{1,15}$/ },
      { path: 'CdtTrfTxInf/IntrBkSttlmAmt', type: 'ActiveCurrencyAndAmount', attribute: 'Ccy' },
      { path: 'CdtTrfTxInf/PmtId/EndToEndId', maxLength: 35 },
    ],
    extractionMap: {
      'Message ID': 'GrpHdr/MsgId','Creation Date': 'GrpHdr/CreDtTm','Transactions': 'GrpHdr/NbOfTxs',
      'Settlement Method': 'GrpHdr/SttlmInf/SttlmMtd','End-to-End ID': 'CdtTrfTxInf/PmtId/EndToEndId',
      'Amount': 'CdtTrfTxInf/IntrBkSttlmAmt','Currency': 'CdtTrfTxInf/IntrBkSttlmAmt@Ccy',
      'Debtor Institution BIC': 'CdtTrfTxInf/Dbtr/FinInstnId/BICFI',
      'Creditor Institution BIC': 'CdtTrfTxInf/Cdtr/FinInstnId/BICFI',
    },
  },

  'pain.002': {
    messageType: 'pain.002.001',
    rootElement: 'CstmrPmtStsRpt',
    namespace: 'urn:iso:std:iso:20022:tech:xsd:pain.002.001.10',
    description: 'Customer Payment Status Report',
    mandatoryPaths: [
      'GrpHdr/MsgId','GrpHdr/CreDtTm',
      'OrgnlGrpInfAndSts/OrgnlMsgId','OrgnlGrpInfAndSts/OrgnlMsgNmId',
      'OrgnlPmtInfAndSts/OrgnlPmtInfId','OrgnlPmtInfAndSts/TxInfAndSts/TxSts',
    ],
    codeValues: {
      'OrgnlPmtInfAndSts/TxInfAndSts/TxSts': ['ACCP','ACSC','ACSP','ACTC','ACWC','ACWP','PDNG','RCVD','RJCT','CANC'],
      'OrgnlPmtInfAndSts/TxInfAndSts/StsRsnInf/Rsn/Cd': [
        'AC01','AC04','AC06','AG01','AG02','AM01','AM02','AM03','AM04','AM05','AM09','AM10',
        'BE01','BE04','BE05','DT01','FF01','MD01','MS02','MS03','RC01',
        'RR01','RR02','RR03','RR04','TM01',
      ],
    },
    formatRules: [
      { path: 'GrpHdr/MsgId', maxLength: 35 },
      { path: 'GrpHdr/CreDtTm', type: 'ISODateTime' },
      { path: 'OrgnlGrpInfAndSts/OrgnlMsgId', maxLength: 35 },
    ],
    extractionMap: {
      'Message ID': 'GrpHdr/MsgId','Creation Date': 'GrpHdr/CreDtTm',
      'Original Message ID': 'OrgnlGrpInfAndSts/OrgnlMsgId',
      'Original Message Type': 'OrgnlGrpInfAndSts/OrgnlMsgNmId',
      'Original Payment Info ID': 'OrgnlPmtInfAndSts/OrgnlPmtInfId',
      'Transaction Status': 'OrgnlPmtInfAndSts/TxInfAndSts/TxSts',
      'Status Reason Code': 'OrgnlPmtInfAndSts/TxInfAndSts/StsRsnInf/Rsn/Cd',
    },
  },

  'pain.008': {
    messageType: 'pain.008.001',
    rootElement: 'CstmrDrctDbtInitn',
    namespace: 'urn:iso:std:iso:20022:tech:xsd:pain.008.001.08',
    description: 'Customer Direct Debit Initiation',
    mandatoryPaths: [
      'GrpHdr/MsgId','GrpHdr/CreDtTm','GrpHdr/NbOfTxs','GrpHdr/InitgPty/Nm',
      'PmtInf/PmtInfId','PmtInf/PmtMtd','PmtInf/NbOfTxs','PmtInf/ReqdColltnDt/Dt',
      'PmtInf/Cdtr/Nm','PmtInf/CdtrAcct/Id','PmtInf/CdtrAgt/FinInstnId',
      'PmtInf/DrctDbtTxInf/PmtId/EndToEndId','PmtInf/DrctDbtTxInf/InstdAmt',
      'PmtInf/DrctDbtTxInf/DrctDbtTx/MndtRltdInf/MndtId','PmtInf/DrctDbtTxInf/DrctDbtTx/MndtRltdInf/DtOfSgntr',
      'PmtInf/DrctDbtTxInf/DbtrAgt/FinInstnId','PmtInf/DrctDbtTxInf/Dbtr/Nm','PmtInf/DrctDbtTxInf/DbtrAcct/Id',
    ],
    codeValues: {
      'PmtInf/PmtMtd': ['DD'],
      'PmtInf/PmtTpInf/SeqTp': ['FRST','RCUR','FNAL','OOFF'],
      'PmtInf/PmtTpInf/LclInstrm/Cd': ['CORE','B2B'],
    },
    formatRules: [
      { path: 'GrpHdr/MsgId', maxLength: 35 },
      { path: 'GrpHdr/CreDtTm', type: 'ISODateTime' },
      { path: 'GrpHdr/NbOfTxs', pattern: /^\d{1,15}$/ },
      { path: 'PmtInf/ReqdColltnDt/Dt', type: 'ISODate' },
      { path: 'PmtInf/DrctDbtTxInf/InstdAmt', type: 'ActiveCurrencyAndAmount', attribute: 'Ccy' },
      { path: 'PmtInf/DrctDbtTxInf/PmtId/EndToEndId', maxLength: 35 },
    ],
    extractionMap: {
      'Message ID': 'GrpHdr/MsgId','Creation Date': 'GrpHdr/CreDtTm','Transactions': 'GrpHdr/NbOfTxs',
      'Initiating Party': 'GrpHdr/InitgPty/Nm','Payment Method': 'PmtInf/PmtMtd',
      'Collection Date': 'PmtInf/ReqdColltnDt/Dt','Sequence Type': 'PmtInf/PmtTpInf/SeqTp',
      'Creditor': 'PmtInf/Cdtr/Nm','Creditor IBAN': 'PmtInf/CdtrAcct/Id/IBAN',
      'End-to-End ID': 'PmtInf/DrctDbtTxInf/PmtId/EndToEndId',
      'Amount': 'PmtInf/DrctDbtTxInf/InstdAmt','Currency': 'PmtInf/DrctDbtTxInf/InstdAmt@Ccy',
      'Mandate ID': 'PmtInf/DrctDbtTxInf/DrctDbtTx/MndtRltdInf/MndtId',
      'Debtor': 'PmtInf/DrctDbtTxInf/Dbtr/Nm','Debtor IBAN': 'PmtInf/DrctDbtTxInf/DbtrAcct/Id/IBAN',
    },
  },

  'pacs.010': {
    messageType: 'pacs.010.001',
    rootElement: 'FIDrctDbt',
    namespace: 'urn:iso:std:iso:20022:tech:xsd:pacs.010.001.03',
    description: 'FI to FI Direct Debit',
    mandatoryPaths: [
      'GrpHdr/MsgId','GrpHdr/CreDtTm','GrpHdr/NbOfTxs','GrpHdr/SttlmInf/SttlmMtd',
      'CdtInstr/CdtId','CdtInstr/IntrBkSttlmAmt',
      'CdtInstr/Cdtr/FinInstnId','CdtInstr/Dbtr/FinInstnId',
    ],
    codeValues: {
      'GrpHdr/SttlmInf/SttlmMtd': ['CLRG','COVE','INDA','INGA'],
    },
    formatRules: [
      { path: 'GrpHdr/MsgId', maxLength: 35 },
      { path: 'GrpHdr/CreDtTm', type: 'ISODateTime' },
      { path: 'GrpHdr/NbOfTxs', pattern: /^\d{1,15}$/ },
      { path: 'CdtInstr/IntrBkSttlmAmt', type: 'ActiveCurrencyAndAmount', attribute: 'Ccy' },
    ],
    extractionMap: {
      'Message ID': 'GrpHdr/MsgId','Creation Date': 'GrpHdr/CreDtTm','Transactions': 'GrpHdr/NbOfTxs',
      'Settlement Method': 'GrpHdr/SttlmInf/SttlmMtd','Credit ID': 'CdtInstr/CdtId',
      'Amount': 'CdtInstr/IntrBkSttlmAmt','Currency': 'CdtInstr/IntrBkSttlmAmt@Ccy',
      'Creditor Institution BIC': 'CdtInstr/Cdtr/FinInstnId/BICFI',
      'Debtor Institution BIC': 'CdtInstr/Dbtr/FinInstnId/BICFI',
    },
  },

  'camt.052': {
    messageType: 'camt.052.001',
    rootElement: 'BkToCstmrAcctRpt',
    namespace: 'urn:iso:std:iso:20022:tech:xsd:camt.052.001.08',
    description: 'Bank to Customer Account Report (Intraday)',
    mandatoryPaths: [
      'GrpHdr/MsgId','GrpHdr/CreDtTm','Rpt/Id','Rpt/CreDtTm',
      'Rpt/Acct/Id','Rpt/Acct/Ccy','Rpt/Bal/Tp/CdOrPrtry/Cd','Rpt/Bal/Amt',
      'Rpt/Bal/CdtDbtInd','Rpt/Bal/Dt/Dt',
    ],
    codeValues: {
      'Rpt/Bal/CdtDbtInd': ['CRDT','DBIT'],
      'Rpt/Bal/Tp/CdOrPrtry/Cd': ['OPBD','CLBD','CLAV','FWAV','INFO','ITBD','ITAV','PRCD','XPCD'],
    },
    formatRules: [
      { path: 'GrpHdr/MsgId', maxLength: 35 },
      { path: 'GrpHdr/CreDtTm', type: 'ISODateTime' },
      { path: 'Rpt/Bal/Amt', type: 'ActiveOrHistoricCurrencyAndAmount', attribute: 'Ccy' },
      { path: 'Rpt/Bal/Dt/Dt', type: 'ISODate' },
    ],
    extractionMap: {
      'Message ID': 'GrpHdr/MsgId','Creation Date': 'GrpHdr/CreDtTm','Report ID': 'Rpt/Id',
      'Account ID': 'Rpt/Acct/Id/IBAN','Account Currency': 'Rpt/Acct/Ccy',
      'Balance Type': 'Rpt/Bal/Tp/CdOrPrtry/Cd','Balance Amount': 'Rpt/Bal/Amt',
      'Balance Currency': 'Rpt/Bal/Amt@Ccy','Credit/Debit': 'Rpt/Bal/CdtDbtInd',
      'Balance Date': 'Rpt/Bal/Dt/Dt',
    },
  },
};

// ─── SAMPLE XML (inlined) ───
var sampleXMLData = {
  'pacs008': '<?xml version="1.0" encoding="UTF-8"?>\n<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.008.001.08">\n  <FIToFICstmrCdtTrf>\n    <GrpHdr>\n      <MsgId>PACS008-20250115-001</MsgId>\n      <CreDtTm>2025-01-15T09:00:00</CreDtTm>\n      <NbOfTxs>1</NbOfTxs>\n      <SttlmInf><SttlmMtd>CLRG</SttlmMtd></SttlmInf>\n    </GrpHdr>\n    <CdtTrfTxInf>\n      <PmtId><EndToEndId>E2E-PACS008-001</EndToEndId></PmtId>\n      <IntrBkSttlmAmt Ccy="USD">10000.00</IntrBkSttlmAmt>\n      <ChrgBr>SLEV</ChrgBr>\n      <Dbtr><Nm>Acme Corporation</Nm></Dbtr>\n      <DbtrAcct><Id><IBAN>GB29NWBK60161331926819</IBAN></Id></DbtrAcct>\n      <DbtrAgt><FinInstnId><BICFI>NWBKGB2L</BICFI></FinInstnId></DbtrAgt>\n      <Cdtr><Nm>Global Trade Bank</Nm></Cdtr>\n      <CdtrAcct><Id><IBAN>DE89370400440532013000</IBAN></Id></CdtrAcct>\n      <CdtrAgt><FinInstnId><BICFI>COBADEFFXXX</BICFI></FinInstnId></CdtrAgt>\n    </CdtTrfTxInf>\n  </FIToFICstmrCdtTrf>\n</Document>',

  'pain001': '<?xml version="1.0" encoding="UTF-8"?>\n<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.09">\n  <CstmrCdtTrfInitn>\n    <GrpHdr>\n      <MsgId>PAIN001-20250115-001</MsgId>\n      <CreDtTm>2025-01-15T10:30:00</CreDtTm>\n      <NbOfTxs>1</NbOfTxs>\n      <CtrlSum>25000.00</CtrlSum>\n      <InitgPty>\n        <Nm>Horizon Logistics Ltd</Nm>\n      </InitgPty>\n    </GrpHdr>\n    <PmtInf>\n      <PmtInfId>PMT-BATCH-20250115-001</PmtInfId>\n      <PmtMtd>TRF</PmtMtd>\n      <NbOfTxs>1</NbOfTxs>\n      <CtrlSum>25000.00</CtrlSum>\n      <ReqdExctnDt>\n        <Dt>2025-01-16</Dt>\n      </ReqdExctnDt>\n      <Dbtr>\n        <Nm>Horizon Logistics Ltd</Nm>\n      </Dbtr>\n      <DbtrAcct>\n        <Id><IBAN>FR7630006000011234567890189</IBAN></Id>\n      </DbtrAcct>\n      <DbtrAgt>\n        <FinInstnId><BICFI>BNPAFRPP</BICFI></FinInstnId>\n      </DbtrAgt>\n      <CdtTrfTxInf>\n        <PmtId>\n          <EndToEndId>E2E-PAIN001-001</EndToEndId>\n        </PmtId>\n        <Amt>\n          <InstdAmt Ccy="EUR">25000.00</InstdAmt>\n        </Amt>\n        <ChrgBr>SHAR</ChrgBr>\n        <CdtrAgt>\n          <FinInstnId><BICFI>ABNANL2A</BICFI></FinInstnId>\n        </CdtrAgt>\n        <Cdtr>\n          <Nm>NorthStar Manufacturing BV</Nm>\n        </Cdtr>\n        <CdtrAcct>\n          <Id><IBAN>NL91ABNA0417164300</IBAN></Id>\n        </CdtrAcct>\n      </CdtTrfTxInf>\n    </PmtInf>\n  </CstmrCdtTrfInitn>\n</Document>',

  'pacs002': '<?xml version="1.0" encoding="UTF-8"?>\n<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.002.001.10">\n  <FIToFIPmtStsRpt>\n    <GrpHdr>\n      <MsgId>PACS002-20250115-001</MsgId>\n      <CreDtTm>2025-01-15T11:45:00</CreDtTm>\n    </GrpHdr>\n    <TxInfAndSts>\n      <OrgnlGrpInf>\n        <OrgnlMsgId>PACS008-20250115-001</OrgnlMsgId>\n        <OrgnlMsgNmId>pacs.008.001.08</OrgnlMsgNmId>\n      </OrgnlGrpInf>\n      <OrgnlEndToEndId>E2E-PACS008-001</OrgnlEndToEndId>\n      <TxSts>ACSC</TxSts>\n      <AccptncDtTm>2025-01-15T11:44:30</AccptncDtTm>\n      <InstgAgt>\n        <FinInstnId><BICFI>NWBKGB2L</BICFI></FinInstnId>\n      </InstgAgt>\n      <InstdAgt>\n        <FinInstnId><BICFI>COBADEFFXXX</BICFI></FinInstnId>\n      </InstdAgt>\n    </TxInfAndSts>\n  </FIToFIPmtStsRpt>\n</Document>',

  'camt053': '<?xml version="1.0" encoding="UTF-8"?>\n<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.053.001.08">\n  <BkToCstmrStmt>\n    <GrpHdr>\n      <MsgId>CAMT053-20250115-001</MsgId>\n      <CreDtTm>2025-01-15T18:00:00</CreDtTm>\n    </GrpHdr>\n    <Stmt>\n      <Id>STMT-20250115-001</Id>\n      <ElctrncSeqNb>1</ElctrncSeqNb>\n      <CreDtTm>2025-01-15T18:00:00</CreDtTm>\n      <Acct>\n        <Id><IBAN>GB29NWBK60161331926819</IBAN></Id>\n        <Ccy>GBP</Ccy>\n      </Acct>\n      <Bal>\n        <Tp><CdOrPrtry><Cd>OPBD</Cd></CdOrPrtry></Tp>\n        <Amt Ccy="GBP">150000.00</Amt>\n        <CdtDbtInd>CRDT</CdtDbtInd>\n        <Dt><Dt>2025-01-15</Dt></Dt>\n      </Bal>\n      <Bal>\n        <Tp><CdOrPrtry><Cd>CLBD</Cd></CdOrPrtry></Tp>\n        <Amt Ccy="GBP">142500.00</Amt>\n        <CdtDbtInd>CRDT</CdtDbtInd>\n        <Dt><Dt>2025-01-15</Dt></Dt>\n      </Bal>\n    </Stmt>\n  </BkToCstmrStmt>\n</Document>',

  'camt054': '<?xml version="1.0" encoding="UTF-8"?>\n<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.054.001.08">\n  <BkToCstmrDbtCdtNtfctn>\n    <GrpHdr>\n      <MsgId>CAMT054-20250115-001</MsgId>\n      <CreDtTm>2025-01-15T14:20:00</CreDtTm>\n    </GrpHdr>\n    <Ntfctn>\n      <Id>NTFCTN-20250115-001</Id>\n      <CreDtTm>2025-01-15T14:20:00</CreDtTm>\n      <Acct>\n        <Id><IBAN>NL91ABNA0417164300</IBAN></Id>\n      </Acct>\n      <Ntry>\n        <Amt Ccy="EUR">25000.00</Amt>\n        <CdtDbtInd>CRDT</CdtDbtInd>\n        <Sts>\n          <Cd>BOOK</Cd>\n        </Sts>\n        <BookgDt><Dt>2025-01-15</Dt></BookgDt>\n        <ValDt><Dt>2025-01-15</Dt></ValDt>\n        <BkTxCd>\n          <Domn>\n            <Cd>PMNT</Cd>\n            <Fmly><Cd>RCDT</Cd><SubFmlyCd>ESCT</SubFmlyCd></Fmly>\n          </Domn>\n        </BkTxCd>\n      </Ntry>\n    </Ntfctn>\n  </BkToCstmrDbtCdtNtfctn>\n</Document>',

  'pacs004': '<?xml version="1.0" encoding="UTF-8"?>\n<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.004.001.09">\n  <PmtRtr>\n    <GrpHdr>\n      <MsgId>PACS004-20250116-001</MsgId>\n      <CreDtTm>2025-01-16T08:15:00</CreDtTm>\n      <NbOfTxs>1</NbOfTxs>\n      <SttlmInf><SttlmMtd>CLRG</SttlmMtd></SttlmInf>\n    </GrpHdr>\n    <TxInf>\n      <OrgnlGrpInf>\n        <OrgnlMsgId>PACS008-20250115-001</OrgnlMsgId>\n        <OrgnlMsgNmId>pacs.008.001.08</OrgnlMsgNmId>\n      </OrgnlGrpInf>\n      <OrgnlEndToEndId>E2E-PACS008-001</OrgnlEndToEndId>\n      <RtrdIntrBkSttlmAmt Ccy="EUR">10000.00</RtrdIntrBkSttlmAmt>\n      <IntrBkSttlmDt>2025-01-16</IntrBkSttlmDt>\n      <RtrRsnInf>\n        <Rsn><Cd>AC04</Cd></Rsn>\n      </RtrRsnInf>\n    </TxInf>\n  </PmtRtr>\n</Document>',

  'pacs009': '<?xml version="1.0" encoding="UTF-8"?>\n<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.009.001.08">\n  <FICdtTrf>\n    <GrpHdr>\n      <MsgId>PACS009-20250115-001</MsgId>\n      <CreDtTm>2025-01-15T13:00:00</CreDtTm>\n      <NbOfTxs>1</NbOfTxs>\n      <SttlmInf><SttlmMtd>COVE</SttlmMtd></SttlmInf>\n    </GrpHdr>\n    <CdtTrfTxInf>\n      <PmtId>\n        <EndToEndId>E2E-PACS009-001</EndToEndId>\n      </PmtId>\n      <IntrBkSttlmAmt Ccy="USD">500000.00</IntrBkSttlmAmt>\n      <IntrBkSttlmDt>2025-01-15</IntrBkSttlmDt>\n      <Dbtr>\n        <FinInstnId><BICFI>BNPAFRPP</BICFI></FinInstnId>\n      </Dbtr>\n      <Cdtr>\n        <FinInstnId><BICFI>NWBKGB2L</BICFI></FinInstnId>\n      </Cdtr>\n    </CdtTrfTxInf>\n  </FICdtTrf>\n</Document>',

  'pain002': '<?xml version="1.0" encoding="UTF-8"?>\n<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.002.001.10">\n  <CstmrPmtStsRpt>\n    <GrpHdr>\n      <MsgId>PAIN002-20250115-001</MsgId>\n      <CreDtTm>2025-01-15T12:00:00</CreDtTm>\n    </GrpHdr>\n    <OrgnlGrpInfAndSts>\n      <OrgnlMsgId>PAIN001-20250115-001</OrgnlMsgId>\n      <OrgnlMsgNmId>pain.001.001.09</OrgnlMsgNmId>\n      <GrpSts>ACSC</GrpSts>\n    </OrgnlGrpInfAndSts>\n    <OrgnlPmtInfAndSts>\n      <OrgnlPmtInfId>PMT-BATCH-20250115-001</OrgnlPmtInfId>\n      <TxInfAndSts>\n        <OrgnlEndToEndId>E2E-PAIN001-001</OrgnlEndToEndId>\n        <TxSts>ACSC</TxSts>\n        <AccptncDtTm>2025-01-15T11:58:00</AccptncDtTm>\n      </TxInfAndSts>\n    </OrgnlPmtInfAndSts>\n  </CstmrPmtStsRpt>\n</Document>',

  'pain008': '<?xml version="1.0" encoding="UTF-8"?>\n<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.008.001.08">\n  <CstmrDrctDbtInitn>\n    <GrpHdr>\n      <MsgId>PAIN008-20250120-001</MsgId>\n      <CreDtTm>2025-01-20T08:00:00</CreDtTm>\n      <NbOfTxs>1</NbOfTxs>\n      <CtrlSum>1500.00</CtrlSum>\n      <InitgPty>\n        <Nm>EuroGym Fitness GmbH</Nm>\n      </InitgPty>\n    </GrpHdr>\n    <PmtInf>\n      <PmtInfId>DD-BATCH-20250120-001</PmtInfId>\n      <PmtMtd>DD</PmtMtd>\n      <NbOfTxs>1</NbOfTxs>\n      <CtrlSum>1500.00</CtrlSum>\n      <PmtTpInf>\n        <SeqTp>RCUR</SeqTp>\n        <LclInstrm><Cd>CORE</Cd></LclInstrm>\n      </PmtTpInf>\n      <ReqdColltnDt>\n        <Dt>2025-01-25</Dt>\n      </ReqdColltnDt>\n      <Cdtr>\n        <Nm>EuroGym Fitness GmbH</Nm>\n      </Cdtr>\n      <CdtrAcct>\n        <Id><IBAN>DE89370400440532013000</IBAN></Id>\n      </CdtrAcct>\n      <CdtrAgt>\n        <FinInstnId><BICFI>COBADEFFXXX</BICFI></FinInstnId>\n      </CdtrAgt>\n      <CdtrSchmeId>\n        <Id><PrvtId><Othr><Id>DE98ZZZ09999999999</Id></Othr></PrvtId></Id>\n      </CdtrSchmeId>\n      <DrctDbtTxInf>\n        <PmtId>\n          <EndToEndId>E2E-DD-001</EndToEndId>\n        </PmtId>\n        <InstdAmt Ccy="EUR">1500.00</InstdAmt>\n        <DrctDbtTx>\n          <MndtRltdInf>\n            <MndtId>MNDT-2024-0042</MndtId>\n            <DtOfSgntr>2024-03-15</DtOfSgntr>\n          </MndtRltdInf>\n        </DrctDbtTx>\n        <DbtrAgt>\n          <FinInstnId><BICFI>BNPAFRPP</BICFI></FinInstnId>\n        </DbtrAgt>\n        <Dbtr>\n          <Nm>Jean-Pierre Dupont</Nm>\n        </Dbtr>\n        <DbtrAcct>\n          <Id><IBAN>FR7630006000011234567890189</IBAN></Id>\n        </DbtrAcct>\n      </DrctDbtTxInf>\n    </PmtInf>\n  </CstmrDrctDbtInitn>\n</Document>',

  'pacs010': '<?xml version="1.0" encoding="UTF-8"?>\n<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.010.001.03">\n  <FIDrctDbt>\n    <GrpHdr>\n      <MsgId>PACS010-20250115-001</MsgId>\n      <CreDtTm>2025-01-15T14:00:00</CreDtTm>\n      <NbOfTxs>1</NbOfTxs>\n      <SttlmInf><SttlmMtd>CLRG</SttlmMtd></SttlmInf>\n    </GrpHdr>\n    <CdtInstr>\n      <CdtId>CDTID-20250115-001</CdtId>\n      <IntrBkSttlmAmt Ccy="EUR">75000.00</IntrBkSttlmAmt>\n      <IntrBkSttlmDt>2025-01-15</IntrBkSttlmDt>\n      <Cdtr>\n        <FinInstnId><BICFI>COBADEFFXXX</BICFI></FinInstnId>\n      </Cdtr>\n      <Dbtr>\n        <FinInstnId><BICFI>BNPAFRPP</BICFI></FinInstnId>\n      </Dbtr>\n    </CdtInstr>\n  </FIDrctDbt>\n</Document>',

  'camt052': '<?xml version="1.0" encoding="UTF-8"?>\n<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.052.001.08">\n  <BkToCstmrAcctRpt>\n    <GrpHdr>\n      <MsgId>CAMT052-20250115-001</MsgId>\n      <CreDtTm>2025-01-15T12:00:00</CreDtTm>\n    </GrpHdr>\n    <Rpt>\n      <Id>RPT-20250115-001</Id>\n      <CreDtTm>2025-01-15T12:00:00</CreDtTm>\n      <Acct>\n        <Id><IBAN>GB29NWBK60161331926819</IBAN></Id>\n        <Ccy>GBP</Ccy>\n      </Acct>\n      <Bal>\n        <Tp><CdOrPrtry><Cd>ITBD</Cd></CdOrPrtry></Tp>\n        <Amt Ccy="GBP">148250.00</Amt>\n        <CdtDbtInd>CRDT</CdtDbtInd>\n        <Dt><Dt>2025-01-15</Dt></Dt>\n      </Bal>\n      <Ntry>\n        <Amt Ccy="GBP">5000.00</Amt>\n        <CdtDbtInd>CRDT</CdtDbtInd>\n        <Sts><Cd>BOOK</Cd></Sts>\n        <BookgDt><Dt>2025-01-15</Dt></BookgDt>\n        <ValDt><Dt>2025-01-15</Dt></ValDt>\n      </Ntry>\n    </Rpt>\n  </BkToCstmrAcctRpt>\n</Document>',
};

// ─── DOM REFS ───
var textarea = document.getElementById('xml-input');
var codeBlock = document.getElementById('xml-code');
var highlightPre = document.getElementById('xml-highlighted');
var validateBtn = document.getElementById('validate-btn');
var fileUpload = document.getElementById('file-upload');
var messageTypeSelect = document.getElementById('message-type-select');
var resultsContent = document.getElementById('results-content');
var emptyState = document.getElementById('empty-state');

// ─── HIGHLIGHTING ───
function updateHighlighting(xmlText) {
  if (hljsAvailable && xmlText.trim()) {
    codeBlock.innerHTML = hljs.highlight(xmlText, { language: 'xml' }).value;
  } else {
    codeBlock.textContent = xmlText;
  }
}

textarea.addEventListener('input', function() { updateHighlighting(textarea.value); });

textarea.addEventListener('scroll', function() {
  highlightPre.scrollTop = textarea.scrollTop;
  highlightPre.scrollLeft = textarea.scrollLeft;
});

// ─── FILE UPLOAD ───
fileUpload.addEventListener('change', function(e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(ev) {
    textarea.value = ev.target.result;
    updateHighlighting(ev.target.result);
  };
  reader.readAsText(file);
  fileUpload.value = '';
});

// ─── LOAD SAMPLE ───
var sampleFileMap = {
  'auto': 'pacs008', 'pacs.008': 'pacs008', 'pain.001': 'pain001',
  'pacs.002': 'pacs002', 'camt.053': 'camt053', 'camt.054': 'camt054',
  'pacs.004': 'pacs004', 'pacs.009': 'pacs009',
  'pain.002': 'pain002', 'pain.008': 'pain008',
  'pacs.010': 'pacs010', 'camt.052': 'camt052',
};

// Sample dropdown click handler
var sampleLinks = document.querySelectorAll('[data-sample]');
for (var i = 0; i < sampleLinks.length; i++) {
  sampleLinks[i].addEventListener('click', function(e) {
    e.preventDefault();
    var type = this.getAttribute('data-sample');
    var filename = sampleFileMap[type] || 'pacs008';
    var xml = sampleXMLData[filename];
    if (xml) {
      textarea.value = xml;
      updateHighlighting(xml);
      messageTypeSelect.value = type;
      showToast('Sample loaded: ' + type);
    }
    // Close the dropdown
    var dropEl = this.closest('[uk-dropdown]');
    if (dropEl) UIkit.dropdown(dropEl).hide(false);
  });
}

// ─── XML PATH RESOLVER ───
function findChildByLocalName(parent, localName) {
  for (var i = 0; i < parent.children.length; i++) {
    if (parent.children[i].localName === localName) return parent.children[i];
  }
  return null;
}

function resolveXMLPath(contextNode, path) {
  var parts = path.split('/');
  var current = contextNode;
  for (var i = 0; i < parts.length; i++) {
    if (!current) return null;
    current = findChildByLocalName(current, parts[i]);
  }
  return current || null;
}

function getPathFromElement(el, stopAt) {
  var parts = [];
  var node = el;
  while (node && node !== stopAt && node.localName) {
    parts.unshift(node.localName);
    node = node.parentElement;
  }
  return parts.join('/');
}

// ─── AUTO-DETECT ───
function detectMessageType(doc) {
  var ns = doc.documentElement.namespaceURI || '';
  var keys = Object.keys(schemaRegistry);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var schema = schemaRegistry[key];
    if (ns.includes(key.replace(/\./g, '.'))) {
      var rootEl = doc.documentElement.getElementsByTagNameNS('*', schema.rootElement);
      if (rootEl.length > 0) return key;
    }
  }
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var schema = schemaRegistry[key];
    var rootEl = doc.documentElement.getElementsByTagNameNS('*', schema.rootElement);
    if (rootEl.length > 0) return key;
  }
  return null;
}

// ─── v1.1 FORMAT VALIDATORS ───
var IBAN_LENGTHS = {
  AL:28,AD:24,AT:20,AZ:28,BH:22,BY:28,BE:16,BA:20,BR:29,BG:22,
  CR:22,HR:21,CY:28,CZ:24,DK:18,DO:28,EG:29,EE:20,FO:18,FI:18,
  FR:27,GE:22,DE:22,GI:23,GR:27,GL:18,GT:28,HU:28,IS:26,IQ:23,
  IE:22,IL:23,IT:27,JO:30,KZ:20,XK:20,KW:30,LV:21,LB:28,LI:21,
  LT:20,LU:20,MT:31,MR:27,MU:30,MC:27,MD:24,ME:22,NL:18,MK:19,
  NO:15,PK:24,PS:29,PL:28,PT:25,QA:29,RO:24,LC:32,SM:27,SA:24,
  RS:22,SC:31,SK:24,SI:19,ES:24,SE:24,CH:21,TL:23,TN:24,TR:26,
  UA:29,AE:23,GB:22,VA:22,VG:24,
};

function validateIBAN(iban) {
  var cleaned = iban.replace(/\s/g, '').toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{4,30}$/.test(cleaned)) {
    return { valid: false, reason: 'Invalid IBAN format' };
  }
  var cc = cleaned.substring(0, 2);
  if (IBAN_LENGTHS[cc] && cleaned.length !== IBAN_LENGTHS[cc]) {
    return { valid: false, reason: 'IBAN for ' + cc + ' must be ' + IBAN_LENGTHS[cc] + ' chars, got ' + cleaned.length };
  }
  var rearranged = cleaned.substring(4) + cleaned.substring(0, 4);
  var numericStr = rearranged.replace(/[A-Z]/g, function(ch) { return (ch.charCodeAt(0) - 55).toString(); });
  var remainder = 0;
  for (var i = 0; i < numericStr.length; i++) {
    remainder = (remainder * 10 + parseInt(numericStr[i])) % 97;
  }
  return remainder === 1 ? { valid: true } : { valid: false, reason: 'IBAN checksum failed (mod-97)' };
}

function validateBIC(bic) {
  var cleaned = bic.replace(/\s/g, '').toUpperCase();
  if (!/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(cleaned)) {
    return { valid: false, reason: 'BIC must be 8 or 11 chars: BBBBCCLL[BBB]' };
  }
  return { valid: true };
}

var ISO_4217_LIST = [
  'AED','AFN','ALL','AMD','ANG','AOA','ARS','AUD','AWG','AZN',
  'BAM','BBD','BDT','BGN','BHD','BIF','BMD','BND','BOB','BRL',
  'BSD','BTN','BWP','BYN','BZD','CAD','CDF','CHF','CLP','CNY',
  'COP','CRC','CUP','CVE','CZK','DJF','DKK','DOP','DZD','EGP',
  'ERN','ETB','EUR','FJD','FKP','GBP','GEL','GHS','GIP','GMD',
  'GNF','GTQ','GYD','HKD','HNL','HTG','HUF','IDR','ILS',
  'INR','IQD','IRR','ISK','JMD','JOD','JPY','KES','KGS','KHR',
  'KMF','KPW','KRW','KWD','KYD','KZT','LAK','LBP','LKR','LRD',
  'LSL','LYD','MAD','MDL','MGA','MKD','MMK','MNT','MOP','MRU',
  'MUR','MVR','MWK','MXN','MYR','MZN','NAD','NGN','NIO','NOK',
  'NPR','NZD','OMR','PAB','PEN','PGK','PHP','PKR','PLN','PYG',
  'QAR','RON','RSD','RUB','RWF','SAR','SBD','SCR','SDG','SEK',
  'SGD','SHP','SLE','SOS','SRD','SSP','STN','SYP','SZL','THB',
  'TJS','TMT','TND','TOP','TRY','TTD','TWD','TZS','UAH','UGX',
  'USD','UYU','UZS','VES','VND','VUV','WST','XAF','XCD','XOF',
  'XPF','YER','ZAR','ZMW','ZWL',
];
var ISO_4217 = {};
for (var i = 0; i < ISO_4217_LIST.length; i++) ISO_4217[ISO_4217_LIST[i]] = true;

function validateCurrency(code) {
  return ISO_4217[code.toUpperCase()] ? { valid: true } : { valid: false, reason: "'" + code + "' is not a valid ISO 4217 currency" };
}

function validateISODate(dateStr) {
  var match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return { valid: false, reason: 'Not a valid ISO date (YYYY-MM-DD)' };
  var y = parseInt(match[1]), m = parseInt(match[2]), d = parseInt(match[3]);
  var date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
    return { valid: false, reason: 'Invalid calendar date: ' + dateStr };
  }
  return { valid: true };
}

function validateISODateTime(dtStr) {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(dtStr)) {
    return { valid: false, reason: 'Not a valid ISO datetime' };
  }
  return isNaN(new Date(dtStr).getTime()) ? { valid: false, reason: 'Cannot parse datetime: ' + dtStr } : { valid: true };
}

// ─── EXTENDED VALIDATION (v1.1) ───
function runExtendedValidation(businessRoot, result) {
  var ibanEls = businessRoot.getElementsByTagNameNS('*', 'IBAN');
  for (var i = 0; i < ibanEls.length; i++) {
    var val = ibanEls[i].textContent.trim();
    if (!val) continue;
    var check = validateIBAN(val);
    if (!check.valid) {
      result.errors.push({ type: 'iban', field: getPathFromElement(ibanEls[i], businessRoot), message: "Invalid IBAN '" + val + "': " + check.reason });
    }
  }

  var bicEls = businessRoot.getElementsByTagNameNS('*', 'BICFI');
  for (var i = 0; i < bicEls.length; i++) {
    var val = bicEls[i].textContent.trim();
    if (!val) continue;
    var check = validateBIC(val);
    if (!check.valid) {
      result.warnings.push({ type: 'bic', field: getPathFromElement(bicEls[i], businessRoot), message: "Invalid BIC '" + val + "': " + check.reason });
    }
  }

  var allEls = businessRoot.getElementsByTagNameNS('*', '*');
  for (var i = 0; i < allEls.length; i++) {
    var ccy = allEls[i].getAttribute('Ccy');
    if (ccy) {
      var check = validateCurrency(ccy);
      if (!check.valid) {
        result.errors.push({ type: 'currency', field: getPathFromElement(allEls[i], businessRoot), message: check.reason });
      }
    }
  }
}

// ─── MAIN VALIDATE ───
function validate(xmlString, forceSchema) {
  var result = { valid: false, errors: [], warnings: [], extracted: {}, messageType: null };

  var parser = new DOMParser();
  var doc = parser.parseFromString(xmlString, 'application/xml');

  var parseError = doc.querySelector('parsererror');
  if (parseError) {
    result.errors.push({ type: 'parse', field: null, message: 'XML parse error: ' + parseError.textContent.substring(0, 300) });
    return result;
  }

  var detectedType = forceSchema || detectMessageType(doc);
  if (!detectedType || !schemaRegistry[detectedType]) {
    result.errors.push({ type: 'schema', field: null, message: 'Unknown message type. Namespace: ' + (doc.documentElement.namespaceURI || 'none') });
    return result;
  }

  var schema = schemaRegistry[detectedType];
  result.messageType = schema.messageType;

  var businessRoot = doc.documentElement.getElementsByTagNameNS('*', schema.rootElement)[0];
  if (!businessRoot) {
    result.errors.push({ type: 'structure', field: null, message: 'Root element <' + schema.rootElement + '> not found' });
    return result;
  }

  for (var i = 0; i < schema.mandatoryPaths.length; i++) {
    var path = schema.mandatoryPaths[i];
    var el = resolveXMLPath(businessRoot, path);
    if (!el || !el.textContent.trim()) {
      result.errors.push({ type: 'mandatory', field: path, message: 'Missing mandatory field: ' + path });
    }
  }

  var codeKeys = Object.keys(schema.codeValues);
  for (var i = 0; i < codeKeys.length; i++) {
    var path = codeKeys[i];
    var validCodes = schema.codeValues[path];
    var el = resolveXMLPath(businessRoot, path);
    if (el && el.textContent.trim() && validCodes.indexOf(el.textContent.trim()) === -1) {
      result.errors.push({ type: 'code', field: path, message: "Invalid code '" + el.textContent.trim() + "'. Allowed: " + validCodes.join(', ') });
    }
  }

  for (var i = 0; i < schema.formatRules.length; i++) {
    var rule = schema.formatRules[i];
    var el = resolveXMLPath(businessRoot, rule.path);
    if (!el || !el.textContent.trim()) continue;
    var value = el.textContent.trim();

    if (rule.maxLength && value.length > rule.maxLength) {
      result.errors.push({ type: 'format', field: rule.path, message: rule.path + ' exceeds max length ' + rule.maxLength + ' (got ' + value.length + ')' });
    }
    if (rule.type === 'ISODateTime') {
      var check = validateISODateTime(value);
      if (!check.valid) result.errors.push({ type: 'format', field: rule.path, message: rule.path + ': ' + check.reason });
    }
    if (rule.type === 'ISODate') {
      var check = validateISODate(value);
      if (!check.valid) result.errors.push({ type: 'format', field: rule.path, message: rule.path + ': ' + check.reason });
    }
    if ((rule.type === 'ActiveCurrencyAndAmount' || rule.type === 'ActiveOrHistoricCurrencyAndAmount') && rule.attribute) {
      if (!/^\d+(\.\d{1,5})?$/.test(value)) {
        result.errors.push({ type: 'format', field: rule.path, message: rule.path + ' is not a valid decimal amount: ' + value });
      }
      var ccy = el.getAttribute(rule.attribute);
      if (!ccy) {
        result.errors.push({ type: 'format', field: rule.path, message: "Missing '" + rule.attribute + "' attribute on " + rule.path });
      } else {
        var ccyCheck = validateCurrency(ccy);
        if (!ccyCheck.valid) result.errors.push({ type: 'currency', field: rule.path, message: ccyCheck.reason });
      }
    }
    if (rule.pattern && !rule.pattern.test(value)) {
      result.errors.push({ type: 'format', field: rule.path, message: rule.path + ' does not match expected pattern' });
    }
  }

  runExtendedValidation(businessRoot, result);

  if (schema.extractionMap) {
    var extractKeys = Object.keys(schema.extractionMap);
    for (var i = 0; i < extractKeys.length; i++) {
      var label = extractKeys[i];
      var path = schema.extractionMap[label];
      if (path.indexOf('@') !== -1) {
        var parts = path.split('@');
        var el = resolveXMLPath(businessRoot, parts[0]);
        if (el) { var v = el.getAttribute(parts[1]); if (v) result.extracted[label] = v; }
      } else {
        var el = resolveXMLPath(businessRoot, path);
        if (el && el.textContent.trim()) result.extracted[label] = el.textContent.trim();
      }
    }
  }

  result.valid = result.errors.length === 0;
  return result;
}

// ─── LINE FINDER ───
function findLineForPath(xmlString, path) {
  if (!path) return null;
  var lastTag = path.split('/').pop();
  var lines = xmlString.split('\n');
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].indexOf('<' + lastTag + '>') !== -1 || lines[i].indexOf('<' + lastTag + ' ') !== -1) return i + 1;
  }
  return null;
}

function markErrorLines(highlightedHtml, errorLines, warningLines) {
  return highlightedHtml.split('\n').map(function(line, i) {
    var n = i + 1;
    if (errorLines.indexOf(n) !== -1) return '<span class="error-line">' + line + '</span>';
    if (warningLines.indexOf(n) !== -1) return '<span class="warning-line">' + line + '</span>';
    return line;
  }).join('\n');
}

// ─── RENDER RESULTS ───
var lastResult = null;

function renderResults(result, xmlString) {
  lastResult = result;
  resultsContent.innerHTML = '';

  var summary = document.createElement('div');
  summary.className = 'validation-summary ' + (result.valid ? 'summary-valid' : 'summary-invalid');
  var errCount = result.errors.length;
  var warnCount = result.warnings.length;
  var validMsg = result.valid
    ? 'Valid ' + (result.messageType ? '<span class="msg-type-badge">' + result.messageType + '</span> ' : '') + 'message'
    : errCount + ' error' + (errCount !== 1 ? 's' : '') + ' found' +
      (result.messageType ? ' in <span class="msg-type-badge">' + result.messageType + '</span>' : '');
  if (warnCount > 0) validMsg += ', ' + warnCount + ' warning' + (warnCount !== 1 ? 's' : '');
  summary.innerHTML =
    '<span uk-icon="icon: ' + (result.valid ? 'check' : 'close') + '; ratio: 1.1"></span>' +
    '<span>' + validMsg + '</span>';
  resultsContent.appendChild(summary);

  var innerWrap = document.createElement('div');
  innerWrap.className = 'results-body-inner';

  if (errCount > 0) {
    var section = document.createElement('div');
    section.innerHTML = '<div class="section-header">Errors <span class="section-count">' + errCount + '</span></div>';
    result.errors.forEach(function(err) {
      var item = document.createElement('div');
      item.className = 'error-item type-error';
      item.innerHTML =
        '<span class="ei-icon" uk-icon="icon: close; ratio: 0.7"></span>' +
        '<div><span>' + esc(err.message) + '</span>' +
        (err.field ? '<span class="field-path">' + esc(err.field) + '</span>' : '') +
        '</div>';
      if (err.field) item.addEventListener('click', function() { scrollToField(xmlString, err.field); });
      section.appendChild(item);
    });
    innerWrap.appendChild(section);
  }

  if (warnCount > 0) {
    var section = document.createElement('div');
    section.innerHTML = '<div class="section-header">Warnings <span class="section-count">' + warnCount + '</span></div>';
    result.warnings.forEach(function(w) {
      var item = document.createElement('div');
      item.className = 'error-item type-warning';
      item.innerHTML =
        '<span class="ei-icon" uk-icon="icon: warning; ratio: 0.7"></span>' +
        '<div><span>' + esc(w.message) + '</span>' +
        (w.field ? '<span class="field-path">' + esc(w.field) + '</span>' : '') +
        '</div>';
      section.appendChild(item);
    });
    innerWrap.appendChild(section);
  }

  var fieldEntries = [];
  var extractedKeys = Object.keys(result.extracted);
  for (var i = 0; i < extractedKeys.length; i++) {
    fieldEntries.push([extractedKeys[i], result.extracted[extractedKeys[i]]]);
  }

  if (fieldEntries.length > 0) {
    var section = document.createElement('div');
    section.innerHTML = '<div class="section-header">Extracted Fields <span class="section-count">' + fieldEntries.length + '</span></div>';
    var grid = document.createElement('div');
    grid.className = 'fields-grid';

    fieldEntries.forEach(function(entry) {
      var label = entry[0], value = entry[1];
      var row = document.createElement('div');
      row.className = 'field-row';
      var displayValue = esc(value);

      if (label.toLowerCase().indexOf('amount') !== -1 && /^\d+(\.\d+)?$/.test(value)) {
        displayValue = '<span class="amount">' + parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '</span>';
      }
      if (label.toLowerCase().indexOf('currency') !== -1) {
        displayValue = '<span class="currency-tag">' + esc(value) + '</span>';
      }
      if (label.toLowerCase().indexOf('status') !== -1) {
        var ac = ['ACCP','ACSC','ACSP','ACTC'], rj = ['RJCT','CANC'], pd = ['PDNG','RCVD'];
        var cls = ac.indexOf(value) !== -1 ? 'status-accepted' : rj.indexOf(value) !== -1 ? 'status-rejected' : pd.indexOf(value) !== -1 ? 'status-pending' : '';
        if (cls) displayValue = '<span class="status-badge ' + cls + '">' + esc(value) + '</span>';
      }

      row.innerHTML = '<span class="field-label">' + esc(label) + '</span><span class="field-value">' + displayValue + '</span>';
      grid.appendChild(row);
    });
    section.appendChild(grid);
    innerWrap.appendChild(section);
  }

  resultsContent.appendChild(innerWrap);

  // Show the actions dropdown in the toolbar
  var actionsWrap = document.getElementById('actions-dropdown-wrap');
  actionsWrap.classList.add('visible');

  // Wire up action buttons (remove old listeners by cloning)
  var copyBtn = document.getElementById('copy-report-btn');
  var compareBtn = document.getElementById('compare-sample-btn');
  var exportBtn = document.getElementById('export-pdf-btn');
  var newCopy = copyBtn.cloneNode(true);
  var newCompare = compareBtn.cloneNode(true);
  var newExport = exportBtn.cloneNode(true);
  copyBtn.parentNode.replaceChild(newCopy, copyBtn);
  compareBtn.parentNode.replaceChild(newCompare, compareBtn);
  exportBtn.parentNode.replaceChild(newExport, exportBtn);
  newCopy.addEventListener('click', function(e) { e.preventDefault(); copyReport(); });
  newCompare.addEventListener('click', function(e) { e.preventDefault(); showDiff(xmlString); });
  newExport.addEventListener('click', function(e) { e.preventDefault(); exportPDF(result); });

  if (hljsAvailable && xmlString.trim()) {
    var el = result.errors.filter(function(e) { return e.field; }).map(function(e) { return findLineForPath(xmlString, e.field); }).filter(Boolean);
    var wl = result.warnings.filter(function(w) { return w.field; }).map(function(w) { return findLineForPath(xmlString, w.field); }).filter(Boolean);
    codeBlock.innerHTML = markErrorLines(hljs.highlight(xmlString, { language: 'xml' }).value, el, wl);
  }

  // Status communicated via summary banner above
}

function scrollToField(xmlString, field) {
  var line = findLineForPath(xmlString, field);
  if (line === null) return;
  var lineHeight = parseFloat(getComputedStyle(textarea).lineHeight) || 20;
  textarea.scrollTop = Math.max(0, (line - 3) * lineHeight);
  highlightPre.scrollTop = textarea.scrollTop;
}

// ─── VALIDATE BUTTON ───
validateBtn.addEventListener('click', function() {
  var xmlString = textarea.value.trim();
  if (!xmlString) { resultsContent.innerHTML = ''; resultsContent.appendChild(emptyState); return; }
  var forceType = messageTypeSelect.value;
  renderResults(validate(xmlString, forceType === 'auto' ? null : forceType), xmlString);
});

textarea.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); validateBtn.click(); }
});

// ─── COPY REPORT ───
function copyReport() {
  if (!lastResult) return;
  var report = {
    timestamp: new Date().toISOString(),
    messageType: lastResult.messageType,
    valid: lastResult.valid,
    errorCount: lastResult.errors.length,
    warningCount: lastResult.warnings.length,
    errors: lastResult.errors.map(function(e) { return { type: e.type, field: e.field, message: e.message }; }),
    warnings: lastResult.warnings.map(function(w) { return { type: w.type, field: w.field, message: w.message }; }),
    extractedFields: lastResult.extracted,
  };
  navigator.clipboard.writeText(JSON.stringify(report, null, 2))
    .then(function() { showToast('Report copied to clipboard'); })
    .catch(function() { showToast('Report copied to clipboard'); });
}

// ─── DIFF VIEW ───
function lcsLines(a, b) {
  var m = a.length, n = b.length;
  var dp = [];
  for (var i = 0; i <= m; i++) { dp[i] = []; for (var j = 0; j <= n; j++) dp[i][j] = 0; }
  for (var i = 1; i <= m; i++)
    for (var j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1]);
  var res = [];
  var i = m, j = n;
  while (i > 0 && j > 0) {
    if (a[i-1] === b[j-1]) { res.unshift({ type: 'same', text: a[--i] }); j--; }
    else if (dp[i-1][j] >= dp[i][j-1]) res.unshift({ type: 'removed', text: a[--i] });
    else res.unshift({ type: 'added', text: b[--j] });
  }
  while (i > 0) res.unshift({ type: 'removed', text: a[--i] });
  while (j > 0) res.unshift({ type: 'added', text: b[--j] });
  return res;
}

function showDiff(userXml) {
  var type = messageTypeSelect.value === 'auto'
    ? (lastResult && lastResult.messageType ? (function() { var keys = Object.keys(schemaRegistry); for (var i = 0; i < keys.length; i++) if (schemaRegistry[keys[i]].messageType === lastResult.messageType) return keys[i]; return null; })() : null)
    : messageTypeSelect.value;
  if (!type) { showToast('Cannot determine message type', true); return; }

  var filename = sampleFileMap[type] || 'pacs008';
  var sampleXml = sampleXMLData[filename];
  if (!sampleXml) { showToast('Sample not available', true); return; }

  var diff = lcsLines(userXml.split('\n'), sampleXml.split('\n'));
  var leftPanel = document.getElementById('diff-left');
  var rightPanel = document.getElementById('diff-right');
  var lh = '', rh = '';
  for (var i = 0; i < diff.length; i++) {
    var d = diff[i];
    var e = esc(d.text || '');
    if (d.type === 'same') { lh += '<span class="diff-line diff-same">' + e + '</span>\n'; rh += '<span class="diff-line diff-same">' + e + '</span>\n'; }
    else if (d.type === 'removed') { lh += '<span class="diff-line diff-removed">' + e + '</span>\n'; rh += '<span class="diff-line">\n</span>\n'; }
    else { lh += '<span class="diff-line">\n</span>\n'; rh += '<span class="diff-line diff-added">' + e + '</span>\n'; }
  }
  leftPanel.innerHTML = lh;
  rightPanel.innerHTML = rh;

  leftPanel.onscroll = function() { rightPanel.scrollTop = leftPanel.scrollTop; };
  rightPanel.onscroll = function() { leftPanel.scrollTop = rightPanel.scrollTop; };

  UIkit.modal('#diff-modal').show();
}

// ─── PDF EXPORT ───
function exportPDF(result) {
  var errHtml = result.errors.length > 0
    ? '<ul>' + result.errors.map(function(e) { return '<li style="color:#DC3545;margin:4px 0">' + esc(e.message) + '</li>'; }).join('') + '</ul>'
    : '<p style="color:#198754">No errors found.</p>';
  var warnHtml = result.warnings.length > 0
    ? '<ul>' + result.warnings.map(function(w) { return '<li style="color:#997404;margin:4px 0">' + esc(w.message) + '</li>'; }).join('') + '</ul>' : '';
  var fieldsHtml = '';
  var keys = Object.keys(result.extracted);
  for (var i = 0; i < keys.length; i++) {
    fieldsHtml += '<tr><td style="padding:8px 12px;border:1px solid #DEE2E6;font-weight:500">' + esc(keys[i]) + '</td><td style="padding:8px 12px;border:1px solid #DEE2E6;font-family:\'IBM Plex Mono\',monospace">' + esc(result.extracted[keys[i]]) + '</td></tr>';
  }

  var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>ISO 20022 Validation Report</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@400;600&display=swap" rel="stylesheet">' +
    '<style>body{font-family:\'IBM Plex Sans\',sans-serif;padding:40px;max-width:800px;margin:0 auto;color:#212529;font-size:14px}' +
    'h1{font-size:20px;border-bottom:2px solid #212529;padding-bottom:8px}h2{font-size:15px;margin-top:24px;color:#6C757D}' +
    'table{border-collapse:collapse;width:100%;margin-top:8px}.meta{font-size:13px;color:#6C757D;margin:4px 0}' +
    '.badge{display:inline-block;padding:3px 10px;border-radius:4px;font-size:12px;font-weight:600}' +
    '.valid{background:#d1e7dd;color:#0f5132}.invalid{background:#f8d7da;color:#842029}</style></head><body>' +
    '<h1>ISO 20022 Validation Report</h1>' +
    '<p class="meta">Generated: ' + new Date().toLocaleString() + '</p>' +
    '<p class="meta">Message Type: <strong>' + (result.messageType || 'Unknown') + '</strong></p>' +
    '<p><span class="badge ' + (result.valid ? 'valid' : 'invalid') + '">' + (result.valid ? 'VALID' : 'INVALID') + '</span></p>' +
    '<h2>Errors (' + result.errors.length + ')</h2>' + errHtml +
    (result.warnings.length > 0 ? '<h2>Warnings (' + result.warnings.length + ')</h2>' + warnHtml : '') +
    '<h2>Extracted Fields</h2><table>' + fieldsHtml + '</table>' +
    '<p style="margin-top:32px;font-size:11px;color:#ADB5BD">Generated by ISO 20022 Validator</p></body></html>';

  var w = window.open('', '_blank');
  if (w) { w.document.write(html); w.document.close(); setTimeout(function() { w.print(); }, 300); }
  else showToast('Popup blocked', true);
}

// ─── UTILITIES ───
function esc(str) { var d = document.createElement('div'); d.textContent = str; return d.innerHTML; }

function showToast(message, isError) {
  var existing = document.querySelector('.toast-msg');
  if (existing) existing.remove();
  var t = document.createElement('div');
  t.className = 'toast-msg';
  if (isError) { t.style.background = 'var(--error)'; t.style.boxShadow = '0 4px 16px rgba(220,53,69,0.25)'; }
  t.textContent = message;
  document.body.appendChild(t);
  setTimeout(function() { t.remove(); }, 2500);
}
