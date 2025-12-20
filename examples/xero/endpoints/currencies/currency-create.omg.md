---
method: PUT
path: /Currencies
operationId: createCurrency
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - currency: null
      is_object: true
      key: currency
      keyPascal: Currency
    - code: null
      nonString: true
      key: code
      keyPascal: Code
      default: USD
      php: XeroAPI\XeroPHP\Models\Accounting\CurrencyCode::USD
      node: CurrencyCode.USD
      ruby: XeroRuby::Accounting::CurrencyCode::USD
      python: CurrencyCode.USD
      java: com.xero.models.accounting.CurrencyCode.USD
      csharp: CurrencyCode.USD
      object: currency
    - description: null
      is_last: true
      key: description
      keyPascal: Description
      default: United States Dollar
      object: currency
---

# Create a new currency for a Xero organisation

```omg.body
Currency
```

```omg.response
Currencies
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
