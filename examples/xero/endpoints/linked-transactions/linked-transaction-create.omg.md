---
method: PUT
path: /LinkedTransactions
operationId: createLinkedTransaction
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - linkedTransaction: null
      is_object: true
      key: linkedTransaction
      keyPascal: LinkedTransaction
      keySnake: linked_transaction
    - sourceTransactionID: null
      is_uuid: true
      key: sourceTransactionID
      keyPascal: SourceTransactionID
      keySnake: source_transaction_id
      default: 00000000-0000-0000-0000-000000000000
      object: linkedTransaction
    - sourceLineItemID: null
      is_last: true
      is_uuid: true
      key: sourceLineItemID
      keyPascal: SourceLineItemID
      keySnake: source_line_item_id
      default: 00000000-0000-0000-0000-000000000000
      object: linkedTransaction
---

# Creates linked transactions (billable expenses)

```omg.body
LinkedTransaction
```

```omg.response
LinkedTransactions
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
