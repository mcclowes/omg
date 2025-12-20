---
method: POST
path: /Employees
operationId: updateOrCreateEmployees
tags:
  - Accounting
deprecated: true
security:
  - OAuth2:
      - accounting.settings
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - employee: null
      is_object: true
      key: employee
      keyPascal: Employee
    - firstName: null
      key: firstName
      keyPascal: FirstName
      keySnake: first_name
      default: Nick
      object: employee
    - lastName: null
      is_last: true
      key: lastName
      keyPascal: LastName
      keySnake: last_name
      default: Fury
      object: employee
    - employees: null
      is_object: true
      key: employees
      keyPascal: Employees
    - add_employee: null
      is_last: true
      is_array_add: true
      key: employees
      keyPascal: Employees
      java: Employees
      csharp: Employee
      object: employee
---

# Creates a single new employees used in Xero payrun

This endpoint is deprecated and will be removed April 28, 2026

```omg.body
Employees
```

```omg.response
Employees
```

```omg.response.400
Error
```

{{> query/summarize-errors }}

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
