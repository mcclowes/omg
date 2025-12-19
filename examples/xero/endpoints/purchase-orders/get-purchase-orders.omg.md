---
method: GET
path: /PurchaseOrders
operationId: getPurchaseOrders
tags:
  - Accounting
summary: Retrieves purchase orders
---

# Retrieves purchase orders

```omg.query
{
  Status?: "DRAFT" | "SUBMITTED" | "AUTHORISED" | "BILLED" | "DELETED"  // Filter by purchase order status
  DateFrom?: string  // Filter by purchase order date (e.g. GET https://.../PurchaseOrders?DateFrom=2015-12-01&DateTo=2015-12-31
  DateTo?: string  // Filter by purchase order date (e.g. GET https://.../PurchaseOrders?DateFrom=2015-12-01&DateTo=2015-12-31
  order?: string  // Order by an any element
  page?: integer  // To specify a page, append the page parameter to the URL e.g. ?page=1. If there are 100 records in the response you will need to check if there is any more data by fetching the next page e.g ?page=2 and continuing this process until no more results are returned.
  pageSize?: integer  // Number of records to retrieve per page
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "If-Modified-Since"?: datetime  // Only records created or modified since this timestamp will be returned
}
```

```omg.response
PurchaseOrders
```
