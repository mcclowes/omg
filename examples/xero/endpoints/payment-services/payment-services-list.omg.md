---
method: GET
path: /PaymentServices
operationId: getPaymentServices
tags:
  - Accounting
security:
  - OAuth2:
      - paymentservices
extensions:
  x-excludeFromPreview: true
---

# Retrieves payment services

```omg.response
PaymentServices
```

{{> headers/xero-tenant-id }}
