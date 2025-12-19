---
method: GET
path: /Reports/AgedPayablesByContact
operationId: getReportAgedPayablesByContact
tags:
  - Accounting
summary: Retrieves report for aged payables by contact
---

# Retrieves report for aged payables by contact

```omg.query
{
  contactId: uuid  // Unique identifier for a Contact
  date?: date  // The date of the Aged Payables By Contact report
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
