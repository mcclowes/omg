---
method: GET
path: /Employees/{EmployeeID}
operationId: getEmployee
tags:
  - Accounting
deprecated: true
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves a specific employee used in Xero payrun using a unique employee Id

This endpoint is deprecated and will be removed April 28, 2026

```omg.path
{
  EmployeeID: uuid  // Unique identifier for a Employee
}
```

```omg.response
Employees
```

{{> headers/xero-tenant-id }}
