---
method: GET
path: /PurchaseOrders
operationId: getPurchaseOrders
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves purchase orders

```omg.query
{
  Status?: "DRAFT" | "SUBMITTED" | "AUTHORISED" | "BILLED" | "DELETED"  // Filter by purchase order status
  DateFrom?: string  // Filter by purchase order date (e.g. GET https://.../PurchaseOrders?DateFrom=2015-12-01&DateTo=2015-12-31
  DateTo?: string  // Filter by purchase order date (e.g. GET https://.../PurchaseOrders?DateFrom=2015-12-01&DateTo=2015-12-31
}
```

```omg.response
PurchaseOrders
```

{{> query/order }}

{{> query/page }}

{{> query/page-size }}

{{> headers/xero-tenant-id }}

{{> headers/if-modified-since }}
