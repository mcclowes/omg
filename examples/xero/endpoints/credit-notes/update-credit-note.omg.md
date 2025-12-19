---
method: POST
path: /CreditNotes/{CreditNoteID}
operationId: updateCreditNote
tags:
  - Accounting
summary: Updates a specific credit note
---

# Updates a specific credit note

```omg.path
{
  CreditNoteID: uuid  // Unique identifier for a Credit Note
}
```

```omg.query
{
  unitdp?: integer  // e.g. unitdp=4 – (Unit Decimal Places) You can opt in to use four decimal places for unit amounts
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
CreditNotes
```

```omg.response
CreditNotes
```

```omg.response.400
Error
```
