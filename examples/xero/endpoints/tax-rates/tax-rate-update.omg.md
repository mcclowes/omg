---
method: POST
path: /TaxRates
operationId: updateTaxRate
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - taxComponent: null
      is_object: true
      key: taxComponent
      keyPascal: TaxComponent
      keySnake: tax_component
    - name: null
      key: name
      keyPascal: Name
      default: State Tax
      object: taxComponent
    - rate: null
      is_last: true
      nonString: true
      key: rate
      keyPascal: Rate
      default: 2.25
      is_money: true
      object: taxComponent
    - taxComponents: null
      is_list: true
      key: taxComponents
      keyPascal: TaxComponents
      csharp: TaxComponent
    - add_taxComponent: null
      is_last: true
      is_list_add: true
      key: taxComponents
      keyPascal: TaxComponents
      keySnake: tax_components
      java: TaxComponents
      python: tax_component
      ruby: tax_component
      csharp: TaxComponent
      object: taxComponent
    - taxRate: null
      is_object: true
      key: taxRate
      keyPascal: TaxRate
      keySnake: tax_rate
    - name: null
      key: name
      keyPascal: Name
      default: CA State Tax
      object: taxRate
    - set_taxComponents: null
      is_variable: true
      nonString: true
      key: taxComponents
      keyPascal: TaxComponents
      object: taxRate
      default: taxComponents
    - taxRates: null
      is_object: true
      key: taxRates
      keyPascal: TaxRates
    - add_taxRate: null
      is_last: true
      is_array_add: true
      key: taxRates
      keyPascal: TaxRates
      keySnake: tax_rates
      java: TaxRates
      python: tax_rate
      ruby: tax_rate
      csharp: TaxRate
      object: taxRate
---

# Updates tax rates

```omg.body
TaxRates
```

```omg.response
TaxRates
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
