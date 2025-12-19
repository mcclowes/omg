---
method: GET
path: /Budgets/{BudgetID}
operationId: getBudget
tags:
  - Accounting
summary: Retrieves a specific budget, which includes budget lines
---

# Retrieves a specific budget, which includes budget lines

```omg.path
{
  BudgetID: uuid  // Unique identifier for Budgets
}
```

```omg.query
{
  DateTo?: date  // Filter by start date
  DateFrom?: date  // Filter by end date
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
Budgets
```
