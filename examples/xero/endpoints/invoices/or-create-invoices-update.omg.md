---
method: POST
path: /Invoices
operationId: updateOrCreateInvoices
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
      java: LocalDate.of(2020, Month.OCTOBER, 10)
      csharp: new DateTime(2020, 10, 10)
      php: new DateTime('2020-10-10')
      node: "'2020-10-10'"
      python: dateutil.parser.parse('2020-10-10T00:00:00Z')
      ruby: "'YYYY-MM-DD'"
    - dueDateValue: null
      is_date: true
      key: dueDateValue
      keyPascal: Date
      keySnake: due_date_value
      java_datatype: LocalDate
      default: LocalDate.of(2020, Month.OCTOBER, 28)
      java: LocalDate.of(2020, Month.OCTOBER, 28)
      csharp: new DateTime(2020, 10, 10)
      php: new DateTime('2020-10-28')
      node: "'2020-10-28'"
      python: dateutil.parser.parse('2020-10-28T00:00:00Z')
      ruby: "'YYYY-MM-DD'"
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
    - invoice: null
      is_object: true
      key: invoice
      keyPascal: Invoice
    - type: null
      nonString: true
      key: type
      keyPascal: Type
      default: ACCREC
      php: XeroAPI\XeroPHP\Models\Accounting\Invoice::TYPE_ACCREC
      node: Invoice.TypeEnum.ACCREC
      ruby: XeroRuby::Accounting::Invoice::ACCREC
      python_string: ACCREC
      java: com.xero.models.accounting.Invoice.TypeEnum.ACCREC
      csharp: Invoice.TypeEnum.ACCREC
      object: invoice
    - set_contact: null
      is_variable: true
      nonString: true
      key: contact
      keyPascal: Contact
      default: contact
      object: invoice
    - date: null
      is_variable: true
      nonString: true
      key: date
      keyPascal: Date
      default: dateValue
      python: date_value
      ruby: date_value
      object: invoice
    - dueDate: null
      is_variable: true
      nonString: true
      key: dueDate
      keyPascal: Date
      keySnake: due_date
      default: dueDateValue
      python: due_date_value
      ruby: due_date_value
      object: invoice
    - set_lineitem: null
      is_variable: true
      nonString: true
      key: lineItems
      keyPascal: LineItems
      keySnake: line_items
      default: lineItems
      python: line_items
      ruby: line_items
      object: invoice
    - reference: null
      key: reference
      keyPascal: Reference
      default: Website Design
      object: invoice
    - status: null
      is_last: true
      nonString: true
      key: status
      keyPascal: Status
      default: DRAFT
      php: XeroAPI\XeroPHP\Models\Accounting\Invoice::STATUS_DRAFT
      node: Invoice.StatusEnum.DRAFT
      ruby: XeroRuby::Accounting::Invoice::DRAFT
      python_string: DRAFT
      java: com.xero.models.accounting.Invoice.StatusEnum.DRAFT
      csharp: Invoice.StatusEnum.DRAFT
      object: invoice
    - invoices: null
      is_object: true
      key: invoices
      keyPascal: Invoices
    - add_invoice: null
      is_last: true
      is_array_add: true
      key: invoices
      keyPascal: Invoices
      java: Invoices
      csharp: Invoice
      object: invoice
---

# Updates or creates one or more sales invoices or purchase bills

```omg.body
Invoices
```

```omg.response
Invoices
```

```omg.response.400
Error
```

{{> query/summarize-errors }}

{{> query/unitdp }}

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
