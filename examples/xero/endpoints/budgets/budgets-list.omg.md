---
method: GET
path: /Budgets
operationId: getBudgets
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.budgets.read
---

# Retrieve a list of budgets

```omg.query
{
  IDs?: string  // Filter by BudgetID. Allows you to retrieve a specific individual budget.
}
```

```omg.response
Budgets
```

{{> query/date-to }}

{{> query/date-from }}

{{> headers/xero-tenant-id }}
