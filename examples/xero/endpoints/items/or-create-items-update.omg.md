---
method: POST
path: /Items
operationId: updateOrCreateItems
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
      default: abcXYZ123
      object: item
    - name: null
      key: name
      keyPascal: Name
      default: HelloWorld
      object: item
    - description: null
      is_last: true
      key: description
      keyPascal: Description
      default: Foobar
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

# Updates or creates one or more items

```omg.body
Items
```

```omg.response
Items
```

```omg.response.400
Error
```

{{> query/summarize-errors }}

{{> query/unitdp }}

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
