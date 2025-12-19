---
method: PUT
path: /CreditNotes/{CreditNoteID}/History
operationId: createCreditNoteHistory
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
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
HistoryRecords
```

```omg.response
HistoryRecords
```

```omg.response.400
Error
```
