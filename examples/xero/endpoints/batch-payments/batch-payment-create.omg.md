---
method: PUT
path: /BatchPayments
operationId: createBatchPayment
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
    - paymentAccount: null
      is_object: true
      key: paymentAccount
      keyPascal: Account
      keySnake: payment_account
    - accountID: null
      is_last: true
      is_uuid: true
      key: accountID
      keyPascal: AccountID
      keySnake: account_id
      default: 00000000-0000-0000-0000-000000000000
      object: paymentAccount
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
    - payment: null
      is_object: true
      key: payment
      keyPascal: Payment
    - set_bankaccount: null
      is_variable: true
      nonString: true
      key: account
      keyPascal: Account
      default: bankAccount
      python: bank_account
      ruby: bank_account
      object: payment
    - date: null
      is_variable: true
      nonString: true
      key: date
      keyPascal: Date
      default: currDate
      python: curr_date
      ruby: curr_date
      object: payment
    - amount: null
      nonString: true
      key: amount
      keyPascal: Amount
      default: 1
      is_money: true
      object: payment
    - set_invoice: null
      is_last: true
      is_variable: true
      nonString: true
      key: invoice
      keyPascal: Invoice
      default: invoice
      object: payment
    - payments: null
      is_list: true
      key: payments
      keyPascal: Payment
    - add_payments: null
      is_last: true
      is_list_add: true
      key: payments
      keyPascal: Payments
      object: payment
    - batchPayment: null
      is_object: true
      key: batchPayment
      keyPascal: BatchPayment
      keySnake: batch_payment
    - set_paymentaccount: null
      is_variable: true
      nonString: true
      key: account
      keyPascal: Account
      default: paymentAccount
      python: payment_account
      ruby: payment_account
      object: batchPayment
    - reference: null
      key: reference
      keyPascal: Reference
      default: hello foobar
      object: batchPayment
    - date: null
      is_variable: true
      nonString: true
      key: date
      keyPascal: Date
      default: currDate
      python: curr_date
      ruby: curr_date
      object: batchPayment
    - set_payments: null
      is_last: true
      is_variable: true
      nonString: true
      key: payments
      keyPascal: Payments
      default: payments
      object: batchPayment
    - batchPayments: null
      is_object: true
      key: batchPayments
      keyPascal: BatchPayments
    - add_batchPayments: null
      is_last: true
      is_array_add: true
      key: batchPayments
      keyPascal: BatchPayments
      keySnake: batch_payments
      java: BatchPayments
      python: batch_payment
      ruby: batch_payment
      csharp: BatchPayment
      object: batchPayment
---

# Creates one or many batch payments for invoices

```omg.body
BatchPayments
```

```omg.response
BatchPayments
```

```omg.response.400
Error
```

{{> query/summarize-errors }}

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
