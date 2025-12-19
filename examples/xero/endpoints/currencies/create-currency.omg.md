---
method: PUT
path: /Currencies
operationId: createCurrency
tags:
  - Accounting
summary: Create a new currency for a Xero organisation
---

# Create a new currency for a Xero organisation

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
Currency
```

```omg.response
Currencies
```
