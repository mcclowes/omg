---
method: POST
path: /Setup
operationId: postSetup
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
extensions:
  x-example:
    - account: null
      is_object: true
      key: account
      keyPascal: Account
    - code: null
      key: code
      keyPascal: Code
      default: 123
      object: account
    - name: null
      key: name
      keyPascal: Name
      default: Business supplies
      object: account
    - type: null
      is_last: true
      key: type
      keyPascal: Type
      default: EXPENSE
      nonString: true
      php: XeroAPI\XeroPHP\Models\Accounting\AccountType::EXPENSE
      node: AccountType.EXPENSE
      ruby: XeroRuby::Accounting::AccountType::EXPENSE
      python: AccountType.EXPENSE
      java: com.xero.models.accounting.AccountType.EXPENSE
      csharp: AccountType.EXPENSE
      object: account
    - accounts: null
      is_list: true
      key: accounts
      keyPascal: Account
    - add_accounts: null
      is_last: true
      is_list_add: true
      key: accounts
      keyPascal: Accounts
      object: account
    - conversionDate: null
      is_object: true
      key: conversionDate
      keyPascal: ConversionDate
      keySnake: conversion_date
    - month: null
      nonString: true
      key: month
      keyPascal: Month
      default: 10
      object: conversionDate
    - year: null
      is_last: true
      nonString: true
      key: year
      keyPascal: Year
      default: 2020
      object: conversionDate
    - conversionBalances: null
      is_list: true
      key: conversionBalances
      keyPascal: ConversionBalances
      keySnake: conversion_balances
    - Setup: null
      is_object: true
      key: setup
      keyPascal: Setup
    - set_accounts: null
      is_variable: true
      nonString: true
      key: accounts
      keyPascal: Accounts
      default: accounts
      object: setup
    - set_conversionDate: null
      is_variable: true
      nonString: true
      key: conversionDate
      keyPascal: ConversionDate
      keySnake: conversion_date
      default: conversionDate
      python: conversion_date
      ruby: conversion_date
      object: setup
    - set_conversionBalances: null
      is_last: true
      is_variable: true
      nonString: true
      key: conversionBalances
      keyPascal: ConversionBalances
      keySnake: conversion_balances
      default: conversionBalances
      python: conversion_balances
      ruby: conversion_balances
      object: setup
---

# Sets the chart of accounts, the conversion date and conversion balances

```omg.body
Setup
```

```omg.response
ImportSummaryObject
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
