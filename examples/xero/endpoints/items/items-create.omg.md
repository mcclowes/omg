---
method: PUT
path: /Items
operationId: createItems
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - purchaseDetails: null
      is_object: true
      key: purchaseDetails
      keyPascal: Purchase
      keySnake: purchase_details
    - cOGSAccountCode: null
      is_last: true
      key: cOGSAccountCode
      keyPascal: CoGSAccountCode
      keySnake: cogs_account_code
      keyCsharp: COGSAccountCode
      default: 500
      object: purchaseDetails
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
      key: description
      keyPascal: Description
      default: Foobar
      object: item
    - inventoryAssetAccountCode: null
      key: inventoryAssetAccountCode
      keyPascal: InventoryAssetAccountCode
      keySnake: inventory_asset_account_code
      default: 140
      object: item
    - set_purchaseDetails: null
      is_last: true
      is_variable: true
      nonString: true
      key: purchaseDetails
      keyPascal: PurchaseDetails
      keySnake: purchase_details
      default: purchaseDetails
      python: purchase_details
      ruby: purchase_details
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

# Creates one or more items

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
