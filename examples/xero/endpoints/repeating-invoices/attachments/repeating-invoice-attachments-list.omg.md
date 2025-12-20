---
method: GET
path: /RepeatingInvoices/{RepeatingInvoiceID}/Attachments
operationId: getRepeatingInvoiceAttachments
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves attachments from a specific repeating invoice

```omg.path
{
  RepeatingInvoiceID: uuid  // Unique identifier for a Repeating Invoice
}
```

```omg.response
Attachments
```

{{> headers/xero-tenant-id }}
