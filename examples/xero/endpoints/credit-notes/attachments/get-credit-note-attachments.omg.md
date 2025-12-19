---
method: GET
path: /CreditNotes/{CreditNoteID}/Attachments
operationId: getCreditNoteAttachments
tags:
  - Accounting
summary: Retrieves attachments for a specific credit notes
---

# Retrieves attachments for a specific credit notes

```omg.path
{
  CreditNoteID: uuid  // Unique identifier for a Credit Note
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
