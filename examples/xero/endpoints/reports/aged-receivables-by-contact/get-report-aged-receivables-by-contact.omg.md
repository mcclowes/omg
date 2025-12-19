---
method: GET
path: /Reports/AgedReceivablesByContact
operationId: getReportAgedReceivablesByContact
tags:
  - Accounting
summary: Retrieves report for aged receivables by contact
---

# Retrieves report for aged receivables by contact

```omg.query
{
  contactId: uuid  // Unique identifier for a Contact
  date?: date  // The date of the Aged Receivables By Contact report
  fromDate?: date  // filter by the from date of the report e.g. 2021-02-01
  toDate?: date  // filter by the to date of the report e.g. 2021-02-28
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
ReportWithRows
```
