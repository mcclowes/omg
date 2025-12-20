---
method: POST
path: /PurchaseOrders/{PurchaseOrderID}
operationId: updatePurchaseOrder
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - purchaseOrder: null
      is_object: true
      key: purchaseOrder
      keyPascal: PurchaseOrder
      keySnake: purchase_order
    - attentionTo: null
      is_last: true
      key: attentionTo
      keyPascal: AttentionTo
      default: Peter Parker
      object: purchaseOrder
    - purchaseOrders: null
      is_object: true
      key: purchaseOrders
      keyPascal: PurchaseOrders
    - add_purchaseOrder: null
      is_last: true
      is_array_add: true
      key: purchaseOrders
      keyPascal: PurchaseOrders
      keySnake: purchase_orders
      java: PurchaseOrders
      python: purchase_order
      ruby: purchase_order
      csharp: PurchaseOrder
      object: purchaseOrder
---

# Updates a specific purchase order

```omg.path
{
  PurchaseOrderID: uuid  // Unique identifier for an Purchase Order
}
```

```omg.body
PurchaseOrders
```

```omg.response
PurchaseOrders
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
