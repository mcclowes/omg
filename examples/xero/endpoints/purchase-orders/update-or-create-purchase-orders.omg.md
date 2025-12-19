---
method: POST
path: /PurchaseOrders
operationId: updateOrCreatePurchaseOrders
tags:
  - Accounting
summary: Updates or creates one or more purchase orders
---

# Updates or creates one or more purchase orders

```omg.query
{
  summarizeErrors?: boolean @default(false)  // If false return 200 OK and mix of successfully created objects and any with validation errors
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
PurchaseOrders
```

```omg.response
PurchaseOrders
```

```omg.response.400
Error
```
