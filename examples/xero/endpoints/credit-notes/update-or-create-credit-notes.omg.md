---
method: POST
path: /CreditNotes
operationId: updateOrCreateCreditNotes
tags:
  - Accounting
summary: Updates or creates one or more credit notes
---

# Updates or creates one or more credit notes

```omg.query
{
  summarizeErrors?: boolean @default(false)  // If false return 200 OK and mix of successfully created objects and any with validation errors
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
