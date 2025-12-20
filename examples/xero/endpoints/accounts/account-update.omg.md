---
method: POST
path: /Accounts/{AccountID}
operationId: updateAccount
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - account: null
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
      default: BarFoo
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
      key: description
      keyPascal: Description
      default: Hello World
      object: account
    - taxType: null
      is_last: true
      key: taxType
      keyPascal: TaxType
      keySnake: tax_type
      default: NONE
      object: account
    - accounts: null
      is_object: true
      key: accounts
      keyPascal: Accounts
    - accounts: null
      is_last: true
      is_array_add: true
      key: accounts
      keyPascal: Accounts
      java: Accounts
      csharp: Account
      object: account
---

# Updates a chart of accounts

```omg.path
{
  AccountID: uuid  // Unique identifier for Account object
}
```

```omg.body
Accounts
```

```omg.response
Accounts
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
