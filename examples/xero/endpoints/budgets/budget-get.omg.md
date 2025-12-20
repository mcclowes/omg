---
method: GET
path: /Budgets/{BudgetID}
operationId: getBudget
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.budgets.read
---

# Retrieves a specific budget, which includes budget lines

```omg.path
{
  BudgetID: uuid  // Unique identifier for Budgets
}
```

```omg.response
Budgets
```

{{> query/date-to }}

{{> query/date-from }}

{{> headers/xero-tenant-id }}
