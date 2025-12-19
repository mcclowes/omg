---
method: GET
path: /RepeatingInvoices/{RepeatingInvoiceID}/Attachments
operationId: getRepeatingInvoiceAttachments
tags:
  - Accounting
summary: Retrieves attachments from a specific repeating invoice
---

# Retrieves attachments from a specific repeating invoice

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
Attachments
```
