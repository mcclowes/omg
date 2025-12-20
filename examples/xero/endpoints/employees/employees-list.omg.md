---
method: GET
path: /Employees
operationId: getEmployees
tags:
  - Accounting
deprecated: true
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves employees used in Xero payrun

This endpoint is deprecated and will be removed April 28, 2026

```omg.response
Employees
```

{{> query/where }}

{{> query/order }}

{{> headers/xero-tenant-id }}

{{> headers/if-modified-since }}
