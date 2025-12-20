---
method: POST
path: /Receipts/{ReceiptID}
operationId: updateReceipt
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - dateValue: null
      is_date: true
      key: dateValue
      keyPascal: Date
      java_datatype: LocalDate
      default: LocalDate.of(2020, Month.OCTOBER, 10)
      java: LocalDate.now()
      csharp: DateTime.Now
      php: new DateTime('2020-12-10')
      node: "'2020-10-10'"
      python: dateutil.parser.parse('2020-10-10T00:00:00Z')
      ruby: "'YYYY-MM-DD'"
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
    - receipt: null
      is_object: true
      key: receipt
      keyPascal: Receipt
    - set_user: null
      is_variable: true
      nonString: true
      key: user
      keyPascal: User
      default: user
      object: receipt
    - reference: null
      key: reference
      keyPascal: Reference
      default: Foobar
      object: receipt
    - date: null
      is_last: true
      is_variable: true
      nonString: true
      key: date
      keyPascal: Date
      default: dateValue
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

# Updates a specific draft expense claim receipts

```omg.path
{
  ReceiptID: uuid  // Unique identifier for a Receipt
}
```

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
