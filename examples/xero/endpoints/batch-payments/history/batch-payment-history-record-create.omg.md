---
method: PUT
path: /BatchPayments/{BatchPaymentID}/History
operationId: createBatchPaymentHistoryRecord
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - historyRecord: null
      is_object: true
      key: historyRecord
      keyPascal: HistoryRecord
      keySnake: history_record
    - Details: null
      is_last: true
      key: details
      keyPascal: Details
      default: Hello World
      object: historyRecord
    - historyRecords: null
      is_object: true
      key: historyRecords
      keyPascal: HistoryRecords
    - add_historyRecord: null
      is_last: true
      is_array_add: true
      key: historyRecords
      keyPascal: HistoryRecords
      keySnake: history_records
      java: HistoryRecords
      python: history_record
      ruby: history_record
      csharp: HistoryRecord
      object: historyRecord
---

# Creates a history record for a specific batch payment

```omg.path
{
  BatchPaymentID: uuid  // Unique identifier for BatchPayment
}
```

```omg.body
HistoryRecords
```

```omg.response
HistoryRecords
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
