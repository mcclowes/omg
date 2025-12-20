---
method: PUT
path: /Receipts
operationId: createReceipt
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
      is_last: true
      is_uuid: true
      key: contactID
      keyPascal: ContactID
      keySnake: contact_id
      default: 00000000-0000-0000-0000-000000000000
      object: contact
    - user: null
      is_object: true
      key: user
      keyPascal: User
    - userID: null
      is_last: true
      is_uuid: true
      key: userID
      keyPascal: UserID
      keySnake: user_id
      default: 00000000-0000-0000-0000-000000000000
      object: user
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
    - receipt: null
      is_object: true
      key: receipt
      keyPascal: Receipt
    - set_contact: null
      is_variable: true
      nonString: true
      key: contact
      keyPascal: Contact
      default: contact
      object: receipt
    - set_user: null
      is_variable: true
      nonString: true
      key: user
      keyPascal: User
      default: user
      object: receipt
    - set_lineitem: null
      is_variable: true
      nonString: true
      key: lineItems
      keyPascal: LineItems
      keySnake: line_items
      default: lineItems
      python: line_items
      ruby: line_items
      object: receipt
    - lineAmountTypes: null
      nonString: true
      key: lineAmountTypes
      keyPascal: LineAmountTypes
      keySnake: line_amount_types
      default: INCLUSIVE
      php: XeroAPI\XeroPHP\Models\Accounting\LineAmountTypes::INCLUSIVE
      node: LineAmountTypes.Inclusive
      ruby: XeroRuby::Accounting::INCLUSIVE
      python: LineAmountTypes.INCLUSIVE
      java: com.xero.models.accounting.LineAmountTypes.INCLUSIVE
      csharp: LineAmountTypes.Exclusive
      object: receipt
    - status: null
      is_last: true
      nonString: true
      key: status
      keyPascal: Status
      default: DRAFT
      php: XeroAPI\XeroPHP\Models\Accounting\Receipt::STATUS_DRAFT
      node: Receipt.StatusEnum.DRAFT
      ruby: XeroRuby::Accounting::Receipt::DRAFT
      python_string: DRAFT
      java: com.xero.models.accounting.Receipt.StatusEnum.DRAFT
      csharp: Receipt.StatusEnum.DRAFT
      object: receipt
    - receipts: null
      is_object: true
      key: receipts
      keyPascal: Receipts
    - add_receipt: null
      is_last: true
      is_array_add: true
      key: receipts
      keyPascal: Receipts
      java: Receipts
      csharp: Receipt
      object: receipt
---

# Creates draft expense claim receipts for any user

```omg.body
Receipts
```

```omg.response
Receipts
```

```omg.response.400
Error
```

{{> query/unitdp }}

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
