---
method: GET
path: /Quotes
operationId: getQuotes
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves sales quotes

```omg.query
{
  ExpiryDateFrom?: date  // Filter for quotes expiring after a particular date
  ExpiryDateTo?: date  // Filter for quotes before a particular date
  ContactID?: uuid  // Filter for quotes belonging to a particular contact
  Status?: string  // Filter for quotes of a particular Status
  QuoteNumber?: string  // Filter by quote number (e.g. GET https://.../Quotes?QuoteNumber=QU-0001)
}
```

```omg.response
Quotes
```

{{> query/date-from }}

{{> query/date-to }}

{{> query/page }}

{{> query/order }}

{{> headers/xero-tenant-id }}

{{> headers/if-modified-since }}
