---
method: POST
path: /LinkedTransactions/{LinkedTransactionID}
operationId: updateLinkedTransaction
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
    - sourceLineItemID: null
      is_uuid: true
      key: sourceLineItemID
      keyPascal: SourceLineItemID
      keySnake: source_line_item_id
      default: 00000000-0000-0000-0000-000000000000
      object: linkedTransaction
    - contactID: null
      is_last: true
      is_uuid: true
      key: contactID
      keyPascal: ContactID
      default: 00000000-0000-0000-0000-000000000000
      object: linkedTransaction
    - linkedTransactions: null
      is_object: true
      key: linkedTransactions
      keyPascal: LinkedTransactions
    - add_linkedTransaction: null
      is_last: true
      is_array_add: true
      key: linkedTransactions
      keyPascal: LinkedTransactions
      keySnake: linked_transactions
      java: LinkedTransactions
      python: linked_transaction
      ruby: linked_transaction
      csharp: LinkedTransaction
      object: linkedTransaction
---

# Updates a specific linked transactions (billable expenses)

```omg.path
{
  LinkedTransactionID: uuid  // Unique identifier for a LinkedTransaction
}
```

```omg.body
LinkedTransactions
```

```omg.response
LinkedTransactions
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
