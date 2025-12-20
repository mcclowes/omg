---
method: POST
path: /Payments
operationId: createPayment
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
      keySnake: date_value
      java_datatype: LocalDate
      default: LocalDate.of(2020, Month.OCTOBER, 10)
      java: LocalDate.now()
      csharp: DateTime.Now
      php: new DateTime('2020-10-10')
      node: "'2020-10-10'"
      python: dateutil.parser.parse('2020-10-10T00:00:00Z')
      ruby: "'YYYY-MM-DD'"
    - invoice: null
      is_object: true
      key: invoice
      keyPascal: Invoice
    - invoiceID: null
      is_last: true
      is_uuid: true
      key: invoiceID
      keyPascal: InvoiceID
      keySnake: invoice_id
      default: 00000000-0000-0000-0000-000000000000
      object: invoice
    - account: null
      is_object: true
      key: account
      keyPascal: Account
    - accountID: null
      is_last: true
      is_uuid: true
      key: accountID
      keyPascal: AccountID
      keySnake: account_id
      default: 00000000-0000-0000-0000-000000000000
      object: account
    - payment: null
      is_object: true
      key: payment
      keyPascal: Payment
    - set_invoice: null
      is_variable: true
      nonString: true
      key: invoice
      keyPascal: Invoice
      default: invoice
      object: payment
    - set_account: null
      is_variable: true
      nonString: true
      key: account
      keyPascal: Account
      default: account
      object: payment
    - amount: null
      nonString: true
      key: amount
      keyPascal: Amount
      default: 1
      is_money: true
      object: payment
    - date: null
      is_last: true
      is_variable: true
      nonString: true
      key: date
      keyPascal: Date
      default: dateValue
      python: date_value
      ruby: date_value
      object: payment
    - payments: null
      is_object: true
      key: payments
      keyPascal: Payments
    - add_payment: null
      is_last: true
      is_array_add: true
      key: payments
      keyPascal: Payments
      java: Payments
      csharp: Payment
      object: payment
---

# Creates a single payment for invoice or credit notes

```omg.body
Payment
```

```omg.response
Payments
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
