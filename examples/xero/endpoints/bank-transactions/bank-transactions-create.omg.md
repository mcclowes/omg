---
method: PUT
path: /BankTransactions
operationId: createBankTransactions
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - contact: null
      is_object: true
      key: contact
      keyPascal: Contact
    - contactID: null
      is_uuid: true
      is_last: true
      key: contactID
      keyPascal: ContactID
      keySnake: contact_id
      default: 00000000-0000-0000-0000-000000000000
      object: contact
    - lineItem: null
      is_object: true
      key: lineItem
      keyPascal: LineItem
      keySnake: line_item
    - description: null
      key: description
      keyPascal: Description
      default: Foobar
      object: lineItem
    - quantity: null
      nonString: true
      key: quantity
      keyPascal: Quantity
      default: 1
      is_money: true
      object: lineItem
    - unitAmount: null
      nonString: true
      key: unitAmount
      keyPascal: UnitAmount
      keySnake: unit_amount
      default: 20
      is_money: true
      object: lineItem
    - accountCode: null
      is_last: true
      key: accountCode
      keyPascal: AccountCode
      keySnake: account_code
      default: "000"
      object: lineItem
    - line_items: null
      is_list: true
      key: lineItems
      keyPascal: LineItems
      keySnake: line_items
      csharp: LineItem
      java: LineItem
    - add_lineitems: null
      is_last: true
      is_list_add: true
      key: lineItems
      keyPascal: LineItems
      keySnake: line_items
      java: LineItems
      python: line_item
      ruby: line_item
      csharp: LineItem
      object: lineItem
    - bankAccount: null
      is_object: true
      key: bankAccount
      keyPascal: Account
      keySnake: bank_account
    - accountID: null
      is_last: true
      is_uuid: true
      key: accountID
      keyPascal: AccountID
      keySnake: account_id
      default: 00000000-0000-0000-0000-000000000000
      object: bankAccount
    - bankTransaction: null
      is_object: true
      key: bankTransaction
      keyPascal: BankTransaction
      keySnake: bank_transaction
    - type: null
      nonString: true
      key: type
      keyPascal: Type
      default: RECEIVE
      php: XeroAPI\XeroPHP\Models\Accounting\BankTransaction::TYPE_RECEIVE
      node: BankTransaction.TypeEnum.RECEIVE
      ruby: XeroRuby::Accounting::BankTransaction::RECEIVE
      python_string: RECEIVE
      java: com.xero.models.accounting.BankTransaction.TypeEnum.RECEIVE
      csharp: BankTransaction.TypeEnum.RECEIVE
      object: bankTransaction
    - set_contact: null
      is_variable: true
      nonString: true
      key: contact
      keyPascal: Contact
      default: contact
      object: bankTransaction
    - set_lineitems: null
      is_variable: true
      nonString: true
      key: lineItems
      keyPascal: LineItems
      object: bankTransaction
      default: lineItems
    - set_bankaccount: null
      is_last: true
      is_variable: true
      nonString: true
      key: bankAccount
      keyPascal: BankAccount
      keySnake: bank_account
      python: bank_account
      ruby: bank_account
      default: bankAccount
      object: bankTransaction
    - bankTransactions: null
      is_object: true
      key: bankTransactions
      keyPascal: BankTransactions
    - add_bankTransaction: null
      is_last: true
      is_array_add: true
      key: bankTransactions
      keyPascal: BankTransactions
      keySnake: bank_transactions
      java: BankTransactions
      python: bank_transaction
      ruby: bank_transaction
      csharp: BankTransaction
      object: bankTransaction
---

# Creates one or more spent or received money transaction

```omg.body
BankTransactions
```

```omg.response
BankTransactions
```

```omg.response.400
Error
```

{{> query/summarize-errors }}

{{> query/unitdp }}

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
