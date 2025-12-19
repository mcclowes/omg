---
method: POST
path: /RepeatingInvoices/{RepeatingInvoiceID}/Attachments/{FileName}
operationId: updateRepeatingInvoiceAttachmentByFileName
tags:
  - Accounting
summary: Updates a specific attachment from a specific repeating invoices by file name
---

# Updates a specific attachment from a specific repeating invoices by file name

```omg.path
{
  RepeatingInvoiceID: uuid  // Unique identifier for a Repeating Invoice
  FileName: string  // Name of the attachment
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
string @format("byte")
```

```omg.response
Attachments
```

```omg.response.400
Error
```
