---
method: GET
path: /InvoiceReminders/Settings
operationId: getInvoiceReminders
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves invoice reminder settings

```omg.response
InvoiceReminders
```

{{> headers/xero-tenant-id }}
