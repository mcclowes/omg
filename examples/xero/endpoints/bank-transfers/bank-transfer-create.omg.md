---
method: PUT
path: /BankTransfers
operationId: createBankTransfer
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - fromBankAccount: null
      is_object: true
      key: fromBankAccount
      keyPascal: Account
    - accountID: null
      is_last: true
      is_uuid: true
      key: accountID
      keyPascal: AccountID
      keySnake: account_id
      default: 00000000-0000-0000-0000-000000000000
      object: fromBankAccount
    - toBankAccount: null
      is_object: true
      key: toBankAccount
      keyPascal: Account
    - accountID: null
      is_last: true
      is_uuid: true
      key: accountID
      keyPascal: AccountID
      keySnake: account_id
      default: 00000000-0000-0000-0000-000000000000
      object: toBankAccount
    - bankTransfer: null
      is_object: true
      key: bankTransfer
      keyPascal: BankTransfer
      keySnake: bank_transfer
    - set_fromBankAccount: null
      is_variable: true
      nonString: true
      key: fromBankAccount
      keyPascal: FromBankAccount
      keySnake: from_bank_account
      default: fromBankAccount
      object: bankTransfer
    - set_toBankAccount: null
      is_variable: true
      nonString: true
      key: toBankAccount
      keyPascal: ToBankAccount
      keySnake: to_bank_account
      default: toBankAccount
      object: bankTransfer
    - amount: null
      is_last: true
      nonString: true
      key: amount
      keyPascal: Amount
      default: 1
      is_money: true
      object: bankTransfer
    - bankTransfers: null
      is_object: true
      key: bankTransfers
      keyPascal: BankTransfers
    - add_bankTransfer: null
      is_last: true
      is_array_add: true
      key: bankTransfers
      keyPascal: BankTransfers
      keySnake: bank_transfers
      java: BankTransfers
      python: bank_transfer
      ruby: bank_transfer
      csharp: BankTransfer
      object: bankTransfer
---

# Creates a bank transfer

```omg.body
BankTransfers
```

```omg.response
BankTransfers
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
