---
method: GET
path: /Reports/TrialBalance
operationId: getReportTrialBalance
tags:
  - Accounting
summary: Retrieves report for trial balance
---

# Retrieves report for trial balance

```omg.query
{
  date?: date  // The date for the Trial Balance report e.g. 2018-03-31
  paymentsOnly?: boolean  // Return cash only basis for the Trial Balance report
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
