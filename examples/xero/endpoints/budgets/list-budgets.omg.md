---
method: GET
path: /Budgets
operationId: getBudgets
tags:
  - Accounting
summary: Retrieve a list of budgets
---

# Retrieve a list of budgets

```omg.query
{
  IDs?: string  // Filter by BudgetID. Allows you to retrieve a specific individual budget.
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
