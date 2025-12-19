---
method: GET
path: /CreditNotes/{CreditNoteID}/History
operationId: getCreditNoteHistory
tags:
  - Accounting
summary: Retrieves history records of a specific credit note
---

# Retrieves history records of a specific credit note

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
HistoryRecords
```
