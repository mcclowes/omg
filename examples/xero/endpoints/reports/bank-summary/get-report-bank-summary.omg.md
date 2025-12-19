---
method: GET
path: /Reports/BankSummary
operationId: getReportBankSummary
tags:
  - Accounting
summary: Retrieves report for bank summary
---

# Retrieves report for bank summary

```omg.query
{
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
