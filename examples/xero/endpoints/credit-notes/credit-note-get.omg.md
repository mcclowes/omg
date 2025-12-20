---
method: GET
path: /CreditNotes/{CreditNoteID}
operationId: getCreditNote
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves a specific credit note using a unique credit note Id

```omg.path
{
  CreditNoteID: uuid  // Unique identifier for a Credit Note
}
```

```omg.response
CreditNotes
```

{{> query/unitdp }}

{{> headers/xero-tenant-id }}
