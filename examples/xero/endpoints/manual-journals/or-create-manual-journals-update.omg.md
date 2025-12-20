---
method: POST
path: /ManualJournals
operationId: updateOrCreateManualJournals
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
      python: dateutil.parser.parse('2020-12-03T00:00:00Z')
      ruby: "'YYYY-MM-DD'"
    - manualJournalLines: null
      is_list: true
      key: manualJournalLines
      keyPascal: ManualJournalLine
      keySnake: manual_journal_lines
    - credit: null
      is_object: true
      key: credit
      keyPascal: ManualJournalLine
    - lineAmount: null
      nonString: true
      key: lineAmount
      keyPascal: LineAmount
      keySnake: line_amount
      default: -100
      is_money: true
      object: credit
    - accountCode: null
      key: accountCode
      keyPascal: AccountCode
      keySnake: account_code
      default: 400
      object: credit
    - description: null
      is_last: true
      key: description
      keyPascal: Description
      default: Hello there
      object: credit
    - add_credit: null
      is_last: true
      is_list_add: true
      key: manualJournalLines
      keyPascal: ManualJournalLine
      keySnake: manual_journal_lines
      object: credit
    - debit: null
      is_object: true
      key: debit
      keyPascal: ManualJournalLine
    - lineAmount: null
      nonString: true
      key: lineAmount
      keyPascal: LineAmount
      keySnake: line_amount
      default: 100
      is_money: true
      object: debit
    - accountCode: null
      key: accountCode
      keyPascal: AccountCode
      keySnake: account_code
      default: 120
      object: debit
    - description: null
      is_last: true
      key: description
      keyPascal: Description
      default: Hello there
      object: debit
    - add_debit: null
      is_last: true
      is_list_add: true
      key: manualJournalLines
      keyPascal: ManualJournalLine
      keySnake: manual_journal_lines
      object: debit
    - manualJournal: null
      is_object: true
      key: manualJournal
      keyPascal: ManualJournal
      keySnake: manual_journal
    - narration: null
      key: narration
      keyPascal: Narration
      default: Foobar
      object: manualJournal
    - date: null
      is_variable: true
      nonString: true
      key: date
      keyPascal: Date
      default: dateValue
      python: date_value
      ruby: date_value
      object: manualJournal
    - set_manualJournalLines: null
      is_last: true
      is_variable: true
      nonString: true
      key: manualJournalLines
      keyPascal: JournalLines
      keySnake: journal_lines
      default: manualJournalLines
      python: manual_journal_lines
      ruby: manual_journal_lines
      object: manualJournal
    - manualJournals: null
      is_object: true
      key: manualJournals
      keyPascal: ManualJournals
    - add_manualJournal: null
      is_last: true
      is_array_add: true
      key: manualJournals
      keyPascal: ManualJournals
      keySnake: manual_journals
      java: ManualJournals
      php: manualJournals
      python: manual_journal
      ruby: manual_journal
      csharp: ManualJournal
      object: manualJournal
---

# Updates or creates a single manual journal

```omg.body
ManualJournals
```

```omg.response
ManualJournals
```

```omg.response.400
Error
```

{{> query/summarize-errors }}

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
