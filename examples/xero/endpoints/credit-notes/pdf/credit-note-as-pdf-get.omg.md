---
method: GET
path: /CreditNotes/{CreditNoteID}/pdf
operationId: getCreditNoteAsPdf
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
extensions:
  x-path: /CreditNotes/{CreditNoteID}
---

# Retrieves credit notes as PDF files

```omg.path
{
  CreditNoteID: uuid  // Unique identifier for a Credit Note
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}
