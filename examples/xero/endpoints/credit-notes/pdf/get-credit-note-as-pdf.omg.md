---
method: GET
path: /CreditNotes/{CreditNoteID}/pdf
operationId: getCreditNoteAsPdf
tags:
  - Accounting
summary: Retrieves credit notes as PDF files
---

# Retrieves credit notes as PDF files

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
string @format("binary")
```
