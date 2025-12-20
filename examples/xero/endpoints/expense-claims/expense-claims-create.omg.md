---
method: PUT
path: /ExpenseClaims
operationId: createExpenseClaims
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - currDate: null
      is_date: true
      key: currDate
      keyPascal: CurrDate
      keySnake: curr_date
      java_datatype: LocalDate
      default: LocalDate.now()
      java: LocalDate.now()
      csharp: DateTime.Now
      node: "'2020-12-10'"
      php: new DateTime('2020-12-10')
      python: dateutil.parser.parse('2020-12-03T00:00:00Z')
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
    - receiptID: null
      is_uuid: true
      key: receiptID
      keyPascal: ReceiptID
      keySnake: receipt_id
      default: 00000000-0000-0000-0000-000000000000
      object: receipt
    - date: null
      is_last: true
      is_variable: true
      nonString: true
      key: date
      keyPascal: Date
      default: currDate
      python: curr_date
      ruby: curr_date
      object: receipt
    - receipts: null
      is_list: true
      key: receipts
      keyPascal: Receipt
    - add_receipts: null
      is_last: true
      is_list_add: true
      key: receipts
      keyPascal: Receipts
      object: receipt
    - expenseClaim: null
      is_object: true
      key: expenseClaim
      keyPascal: ExpenseClaim
      keySnake: expense_claim
    - status: null
      nonString: true
      key: status
      keyPascal: Status
      default: SUBMITTED
      php: XeroAPI\XeroPHP\Models\Accounting\ExpenseClaim::STATUS_SUBMITTED
      node: ExpenseClaim.StatusEnum.SUBMITTED
      ruby: XeroRuby::Accounting::ExpenseClaim::SUBMITTED
      python_string: SUBMITTED
      java: com.xero.models.accounting.ExpenseClaim.StatusEnum.SUBMITTED
      csharp: ExpenseClaim.StatusEnum.SUBMITTED
      object: expenseClaim
    - set_user: null
      is_variable: true
      nonString: true
      key: user
      keyPascal: User
      default: user
      object: expenseClaim
    - set_receipt: null
      is_last: true
      is_variable: true
      nonString: true
      key: receipts
      keyPascal: Receipts
      default: receipts
      object: expenseClaim
    - expenseClaims: null
      is_object: true
      key: expenseClaims
      keyPascal: ExpenseClaims
    - add_expenseClaim: null
      is_array_add: true
      is_last: true
      key: expenseClaims
      keyPascal: ExpenseClaims
      keySnake: expense_claims
      java: ExpenseClaims
      python: expense_claim
      ruby: expense_claim
      csharp: ExpenseClaim
      object: expenseClaim
---

# Creates expense claims

```omg.body
ExpenseClaims
```

```omg.response
ExpenseClaims
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
