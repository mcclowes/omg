---
method: GET
path: /Receipts/{ReceiptID}
operationId: getReceipt
tags:
  - Accounting
summary: Retrieves a specific draft expense claim receipt by using a unique receipt Id
---

# Retrieves a specific draft expense claim receipt by using a unique receipt Id

```omg.path
{
  ReceiptID: uuid  // Unique identifier for a Receipt
}
```

```omg.query
{
  unitdp?: integer  // e.g. unitdp=4 – (Unit Decimal Places) You can opt in to use four decimal places for unit amounts
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
Receipts
```
