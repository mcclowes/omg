---
method: POST
path: /Items/{ItemID}
operationId: updateItem
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - item: null
      is_object: true
      key: item
      keyPascal: Item
    - code: null
      key: code
      keyPascal: Code
      default: ItemCode123
      object: item
    - description: null
      is_last: true
      key: description
      keyPascal: Description
      default: Goodbye
      object: item
    - items: null
      is_object: true
      key: items
      keyPascal: Items
    - add_item: null
      is_last: true
      is_array_add: true
      key: items
      keyPascal: Items
      java: Items
      csharp: Item
      object: item
---

# Updates a specific item

```omg.path
{
  ItemID: uuid  // Unique identifier for an Item
}
```

```omg.body
Items
```

```omg.response
Items
```

```omg.response.400
Error
```

{{> query/unitdp }}

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
