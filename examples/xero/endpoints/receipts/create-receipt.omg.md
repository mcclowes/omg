---
method: PUT
path: /Receipts
operationId: createReceipt
tags:
  - Accounting
summary: Creates draft expense claim receipts for any user
---

# Creates draft expense claim receipts for any user

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
Receipts
```

```omg.response
Receipts
```

```omg.response.400
Error
```
