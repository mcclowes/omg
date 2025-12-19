---
method: POST
path: /Setup
operationId: postSetup
tags:
  - Accounting
summary: Sets the chart of accounts, the conversion date and conversion balances
---

# Sets the chart of accounts, the conversion date and conversion balances

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
Setup
```

```omg.response
ImportSummaryObject
```
