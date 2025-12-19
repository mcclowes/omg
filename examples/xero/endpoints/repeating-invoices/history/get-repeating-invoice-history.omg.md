---
method: GET
path: /RepeatingInvoices/{RepeatingInvoiceID}/History
operationId: getRepeatingInvoiceHistory
tags:
  - Accounting
summary: Retrieves history record for a specific repeating invoice
---

# Retrieves history record for a specific repeating invoice

```omg.path
{
  RepeatingInvoiceID: uuid  // Unique identifier for a Repeating Invoice
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
HistoryRecords
```
