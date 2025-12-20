---
method: GET
path: /LinkedTransactions
operationId: getLinkedTransactions
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves linked transactions (billable expenses)

```omg.query
{
  LinkedTransactionID?: uuid  // The Xero identifier for an Linked Transaction
  SourceTransactionID?: uuid  // Filter by the SourceTransactionID. Get the linked transactions created from a particular ACCPAY invoice
  ContactID?: uuid  // Filter by the ContactID. Get all the linked transactions that have been assigned to a particular customer.
  Status?: string  // Filter by the combination of ContactID and Status. Get  the linked transactions associated to a  customer and with a status
  TargetTransactionID?: uuid  // Filter by the TargetTransactionID. Get all the linked transactions allocated to a particular ACCREC invoice
}
```

```omg.response
LinkedTransactions
```

{{> query/page }}

{{> headers/xero-tenant-id }}
