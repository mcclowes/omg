---
method: POST
path: /CreditNotes/{CreditNoteID}
operationId: updateCreditNote
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
    - creditNote: null
      is_object: true
      key: creditNote
      keyPascal: CreditNote
      keySnake: credit_note
    - type: null
      nonString: true
      key: type
      keyPascal: Type
      default: ACCPAYCREDIT
      php: XeroAPI\XeroPHP\Models\Accounting\CreditNote::TYPE_ACCPAYCREDIT
      node: CreditNote.TypeEnum.ACCPAYCREDIT
      ruby: XeroRuby::Accounting::CreditNote::ACCPAYCREDIT
      python_string: ACCPAYCREDIT
      java: com.xero.models.accounting.CreditNote.TypeEnum.ACCPAYCREDIT
      csharp: CreditNote.TypeEnum.ACCPAYCREDIT
      object: creditNote
    - status: null
      nonString: true
      key: status
      keyPascal: Status
      default: AUTHORISED
      php: XeroAPI\XeroPHP\Models\Accounting\CreditNote::STATUS_AUTHORISED
      node: CreditNote.StatusEnum.AUTHORISED
      ruby: XeroRuby::Accounting::CreditNote::AUTHORISED
      python_string: AUTHORISED
      java: com.xero.models.accounting.CreditNote.StatusEnum.AUTHORISED
      csharp: CreditNote.StatusEnum.AUTHORISED
      object: creditNote
    - reference: null
      key: reference
      keyPascal: Reference
      default: My ref.
      object: creditNote
    - set_contact: null
      is_variable: true
      nonString: true
      key: contact
      keyPascal: Contact
      default: contact
      object: creditNote
    - date: null
      is_variable: true
      nonString: true
      key: date
      keyPascal: Date
      default: currDate
      python: curr_date
      ruby: curr_date
      object: creditNote
    - set_lineitem: null
      is_last: true
      is_variable: true
      nonString: true
      key: lineItems
      keyPascal: LineItems
      keySnake: line_items
      default: lineItems
      python: line_items
      ruby: line_items
      object: creditNote
    - creditNotes: null
      is_object: true
      key: creditNotes
      keyPascal: CreditNotes
    - add_creditNote: null
      is_last: true
      is_array_add: true
      key: creditNotes
      keyPascal: CreditNotes
      keySnake: credit_notes
      java: CreditNotes
      python: credit_note
      ruby: credit_note
      csharp: CreditNote
      object: creditNote
---

# Updates a specific credit note

```omg.path
{
  CreditNoteID: uuid  // Unique identifier for a Credit Note
}
```

```omg.body
CreditNotes
```

```omg.response
CreditNotes
```

```omg.response.400
Error
```

{{> query/unitdp }}

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
