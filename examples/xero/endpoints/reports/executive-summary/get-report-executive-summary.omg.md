---
method: GET
path: /Reports/ExecutiveSummary
operationId: getReportExecutiveSummary
tags:
  - Accounting
summary: Retrieves report for executive summary
---

# Retrieves report for executive summary

```omg.query
{
  date?: date  // The date for the Bank Summary report e.g. 2018-03-31
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
