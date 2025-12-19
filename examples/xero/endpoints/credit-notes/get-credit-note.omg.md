---
method: GET
path: /CreditNotes/{CreditNoteID}
operationId: getCreditNote
tags:
  - Accounting
summary: Retrieves a specific credit note using a unique credit note Id
---

# Retrieves a specific credit note using a unique credit note Id

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
}
```

```omg.response
CreditNotes
```
