---
method: POST
path: /Quotes/{QuoteID}
operationId: updateQuote
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
    - quote: null
      is_object: true
      key: quote
      keyPascal: Quote
    - reference: null
      key: reference
      keyPascal: Reference
      default: I am an update
      object: quote
    - set_contact: null
      is_variable: true
      nonString: true
      key: contact
      keyPascal: Contact
      default: contact
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

# Updates a specific quote

```omg.path
{
  QuoteID: uuid  // Unique identifier for an Quote
}
```

```omg.body
Quotes
```

```omg.response
Quotes
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
