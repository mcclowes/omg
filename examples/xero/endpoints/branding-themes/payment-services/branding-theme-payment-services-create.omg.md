---
method: POST
path: /BrandingThemes/{BrandingThemeID}/PaymentServices
operationId: createBrandingThemePaymentServices
tags:
  - Accounting
security:
  - OAuth2:
      - paymentservices
extensions:
  x-excludeFromPreview: true
  x-hasAccountingValidationError: true
  x-example:
    - object: null
      is_object: true
      key: paymentService
      keyPascal: PaymentService
      keySnake: payment_service
    - paymentServiceID: null
      is_uuid: true
      key: paymentServiceID
      keyPascal: PaymentServiceID
      keySnake: payment_service_id
      default: 00000000-0000-0000-0000-000000000000
      object: paymentService
    - paymentServiceName: null
      key: paymentServiceName
      keyPascal: PaymentServiceName
      keySnake: payment_service_name
      default: ACME Payments
      object: paymentService
    - paymentServiceUrl: null
      key: paymentServiceUrl
      keyPascal: PaymentServiceUrl
      keySnake: payment_service_url
      default: https://www.payupnow.com/
      object: paymentService
    - payNowText: null
      is_last: true
      key: payNowText
      keyPascal: PayNowText
      keySnake: pay_now_text
      default: Pay Now
      object: paymentService
    - paymentServices: null
      is_object: true
      key: paymentServices
      keyPascal: PaymentServices
    - add_paymentService: null
      is_last: true
      is_array_add: true
      key: paymentServices
      keyPascal: PaymentServices
      java: PaymentServices
      csharp: PaymentService
      object: paymentService
---

# Creates a new custom payment service for a specific branding theme

```omg.path
{
  BrandingThemeID: uuid  // Unique identifier for a Branding Theme
}
```

```omg.body
PaymentServices
```

```omg.response
PaymentServices
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
