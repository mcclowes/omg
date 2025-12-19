---
method: GET
path: /Employees/{EmployeeID}
operationId: getEmployee
tags:
  - Accounting
deprecated: true
summary: Retrieves a specific employee used in Xero payrun using a unique employee Id
---

# Retrieves a specific employee used in Xero payrun using a unique employee Id

This endpoint is deprecated and will be removed April 28, 2026

```omg.path
{
  EmployeeID: uuid  // Unique identifier for a Employee
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
Employees
```
