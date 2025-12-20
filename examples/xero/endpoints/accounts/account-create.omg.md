---
method: PUT
path: /Accounts
operationId: createAccount
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - object: null
      is_object: true
      key: account
      keyPascal: Account
    - code: null
      key: code
      keyPascal: Code
      default: 123456
      object: account
    - name: null
      key: name
      keyPascal: Name
      default: FooBar
      object: account
    - type: null
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
    - description: null
      is_last: true
      key: description
      keyPascal: Description
      default: Hello World
      object: account
---

# Creates a new chart of accounts

```omg.body
Account
```

```omg.response
Accounts
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
