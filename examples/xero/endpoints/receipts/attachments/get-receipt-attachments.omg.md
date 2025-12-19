---
method: GET
path: /Receipts/{ReceiptID}/Attachments
operationId: getReceiptAttachments
tags:
  - Accounting
summary: Retrieves attachments for a specific expense claim receipt
---

# Retrieves attachments for a specific expense claim receipt

```omg.path
{
  ReceiptID: uuid  // Unique identifier for a Receipt
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
