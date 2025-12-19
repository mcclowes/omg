---
method: GET
path: /LinkedTransactions
operationId: getLinkedTransactions
tags:
  - Accounting
summary: Retrieves linked transactions (billable expenses)
---

# Retrieves linked transactions (billable expenses)

```omg.query
{
  page?: integer  // Up to 100 linked transactions will be returned in a single API call. Use the page parameter to specify the page to be returned e.g. page=1.
  LinkedTransactionID?: uuid  // The Xero identifier for an Linked Transaction
  SourceTransactionID?: uuid  // Filter by the SourceTransactionID. Get the linked transactions created from a particular ACCPAY invoice
  ContactID?: uuid  // Filter by the ContactID. Get all the linked transactions that have been assigned to a particular customer.
  Status?: string  // Filter by the combination of ContactID and Status. Get  the linked transactions associated to a  customer and with a status
  TargetTransactionID?: uuid  // Filter by the TargetTransactionID. Get all the linked transactions allocated to a particular ACCREC invoice
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
LinkedTransactions
```
