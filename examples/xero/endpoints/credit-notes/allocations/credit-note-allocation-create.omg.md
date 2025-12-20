---
method: PUT
path: /CreditNotes/{CreditNoteID}/Allocations
operationId: createCreditNoteAllocation
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
    - invoice: null
      is_object: true
      key: invoice
      keyPascal: Invoice
    - invoiceID: null
      is_last: true
      is_uuid: true
      key: invoiceID
      keyPascal: InvoiceID
      default: 00000000-0000-0000-0000-000000000000
      object: invoice
    - allocation: null
      is_object: true
      key: allocation
      keyPascal: Allocation
    - amount: null
      nonString: true
      key: amount
      keyPascal: Amount
      default: 1
      is_money: true
      csharp: new decimal(1.0)
      object: allocation
    - date: null
      is_variable: true
      nonString: true
      key: date
      keyPascal: Date
      default: currDate
      python: curr_date
      ruby: curr_date
      object: allocation
    - set_invoice: null
      is_last: true
      is_variable: true
      nonString: true
      key: invoice
      keyPascal: Invoice
      default: invoice
      object: allocation
    - allocations: null
      is_object: true
      key: allocations
      keyPascal: Allocations
    - add_allocation: null
      is_last: true
      is_array_add: true
      key: allocations
      keyPascal: Allocations
      java: Allocations
      csharp: Allocation
      object: allocation
---

# Creates allocation for a specific credit note

```omg.path
{
  CreditNoteID: uuid  // Unique identifier for a Credit Note
}
```

```omg.body
Allocations
```

```omg.response
Allocations
```

```omg.response.400
Error
```

{{> query/summarize-errors }}

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
