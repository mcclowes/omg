---
method: POST
path: /RepeatingInvoices
operationId: updateOrCreateRepeatingInvoices
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
extensions:
  x-hasAccountingValidationError: true
---

# Creates or deletes one or more repeating invoice templates

```omg.body
RepeatingInvoices
```

```omg.response
RepeatingInvoices
```

```omg.response.400
Error
```

{{> query/summarize-errors }}

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
