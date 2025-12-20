---
method: POST
path: /Quotes
operationId: updateOrCreateQuotes
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
      php: new DateTime('2020-12-10')
      node: "'2020-10-10'"
      python: dateutil.parser.parse('2020-12-03T00:00:00Z')
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
    - quote: null
      is_object: true
      key: quote
      keyPascal: Quote
    - set_contact: null
      is_variable: true
      nonString: true
      key: contact
      keyPascal: Contact
      default: contact
      object: quote
    - set_lineitem: null
      is_variable: true
      nonString: true
      key: lineItems
      keyPascal: LineItems
      keySnake: line_items
      default: lineItems
      python: line_items
      ruby: line_items
      object: quote
    - date: null
      is_last: true
      is_variable: true
      nonString: true
      key: date
      keyPascal: Date
      default: dateValue
      python: date_value
      ruby: date_value
      object: quote
    - quotes: null
      is_object: true
      key: quotes
      keyPascal: Quotes
    - add_quote: null
      is_last: true
      is_array_add: true
      key: quotes
      keyPascal: Quotes
      java: Quotes
      csharp: Quote
      object: quote
---

# Updates or creates one or more quotes

```omg.body
Quotes
```

```omg.response
Quotes
```

```omg.response.400
Error
```

{{> query/summarize-errors }}

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
