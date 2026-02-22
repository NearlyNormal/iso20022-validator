export const pacs002Rules = {
  messageType: 'pacs.002.001',
  rootElement: 'FIToFIPmtStsRpt',
  namespace: 'urn:iso:std:iso:20022:tech:xsd:pacs.002.001.10',
  description: 'FI to FI Payment Status Report',
  mandatoryPaths: [
    'GrpHdr/MsgId',
    'GrpHdr/CreDtTm',
    'TxInfAndSts/OrgnlGrpInf/OrgnlMsgId',
    'TxInfAndSts/OrgnlGrpInf/OrgnlMsgNmId',
    'TxInfAndSts/TxSts',
  ],
  codeValues: {
    'TxInfAndSts/TxSts': [
      'ACCP', 'ACSC', 'ACSP', 'ACTC', 'ACWC', 'ACWP',
      'PDNG', 'RCVD', 'RJCT', 'CANC',
    ],
    'TxInfAndSts/StsRsnInf/Rsn/Cd': [
      'AC01', 'AC04', 'AC06', 'AG01', 'AG02',
      'AM01', 'AM02', 'AM03', 'AM04', 'AM05', 'AM09', 'AM10',
      'BE01', 'BE04', 'BE05',
      'DT01', 'FF01', 'MD01',
      'MS02', 'MS03',
      'RC01',
      'RR01', 'RR02', 'RR03', 'RR04',
      'TM01',
    ],
  },
  formatRules: [
    { path: 'GrpHdr/MsgId', maxLength: 35 },
    { path: 'GrpHdr/CreDtTm', type: 'ISODateTime' },
    { path: 'TxInfAndSts/OrgnlGrpInf/OrgnlMsgId', maxLength: 35 },
  ],
  extractionMap: {
    'Message ID': 'GrpHdr/MsgId',
    'Creation Date': 'GrpHdr/CreDtTm',
    'Original Message ID': 'TxInfAndSts/OrgnlGrpInf/OrgnlMsgId',
    'Original Message Type': 'TxInfAndSts/OrgnlGrpInf/OrgnlMsgNmId',
    'Transaction Status': 'TxInfAndSts/TxSts',
    'Status Reason Code': 'TxInfAndSts/StsRsnInf/Rsn/Cd',
    'Status Additional Info': 'TxInfAndSts/StsRsnInf/AddtlInf',
  },
};
