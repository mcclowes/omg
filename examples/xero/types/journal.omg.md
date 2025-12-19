# Journal

```omg.type
type Journal = {
  JournalID?: uuid  // Xero identifier
  JournalDate?: string  // Date the journal was posted
  JournalNumber?: integer  // Xero generated journal number
  CreatedDateUTC?: string  // Created date UTC format
  Reference?: string  // reference field for additional indetifying information
  SourceID?: uuid  // The identifier for the source transaction (e.g. InvoiceID)
  SourceType?: "ACCREC" | "ACCPAY" | "ACCRECCREDIT" | "ACCPAYCREDIT" | "ACCRECPAYMENT" | "ACCPAYPAYMENT" | "ARCREDITPAYMENT" | "APCREDITPAYMENT" | "CASHREC" | "CASHPAID" | "TRANSFER" | "ARPREPAYMENT" | "APPREPAYMENT" | "AROVERPAYMENT" | "APOVERPAYMENT" | "EXPCLAIM" | "EXPPAYMENT" | "MANJOURNAL" | "PAYSLIP" | "WAGEPAYABLE" | "INTEGRATEDPAYROLLPE" | "INTEGRATEDPAYROLLPT" | "EXTERNALSPENDMONEY" | "INTEGRATEDPAYROLLPTPAYMENT" | "INTEGRATEDPAYROLLCN"  // The journal source type. The type of transaction that created the journal
  JournalLines?: JournalLine[]  // See JournalLines
}
```
