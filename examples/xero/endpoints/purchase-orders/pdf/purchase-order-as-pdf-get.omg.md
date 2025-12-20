---
method: GET
path: /PurchaseOrders/{PurchaseOrderID}/pdf
operationId: getPurchaseOrderAsPdf
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
extensions:
  x-path: /PurchaseOrders/{PurchaseOrderID}
---

# Retrieves specific purchase order as PDF files using a unique purchase order Id

```omg.path
{
  PurchaseOrderID: uuid  // Unique identifier for an Purchase Order
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}
