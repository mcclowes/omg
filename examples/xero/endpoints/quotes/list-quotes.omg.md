---
method: GET
path: /Quotes
operationId: getQuotes
tags:
  - Accounting
summary: Retrieves sales quotes
---

# Retrieves sales quotes

```omg.query
{
  DateFrom?: date  // Filter for quotes after a particular date
  DateTo?: date  // Filter for quotes before a particular date
  ExpiryDateFrom?: date  // Filter for quotes expiring after a particular date
  ExpiryDateTo?: date  // Filter for quotes before a particular date
  ContactID?: uuid  // Filter for quotes belonging to a particular contact
  Status?: string  // Filter for quotes of a particular Status
  page?: integer  // e.g. page=1 – Up to 100 Quotes will be returned in a single API call with line items shown for each quote
  order?: string  // Order by an any element
  QuoteNumber?: string  // Filter by quote number (e.g. GET https://.../Quotes?QuoteNumber=QU-0001)
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "If-Modified-Since"?: datetime  // Only records created or modified since this timestamp will be returned
}
```

```omg.response
Quotes
```
