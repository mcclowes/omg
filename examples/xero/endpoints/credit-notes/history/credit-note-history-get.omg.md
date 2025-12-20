---
method: GET
path: /CreditNotes/{CreditNoteID}/History
operationId: getCreditNoteHistory
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves history records of a specific credit note

```omg.path
{
  CreditNoteID: uuid  // Unique identifier for a Credit Note
}
```

```omg.response
HistoryRecords
```

{{> headers/xero-tenant-id }}
