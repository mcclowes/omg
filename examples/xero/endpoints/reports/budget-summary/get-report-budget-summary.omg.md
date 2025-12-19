---
method: GET
path: /Reports/BudgetSummary
operationId: getReportBudgetSummary
tags:
  - Accounting
summary: Retrieves report for budget summary
---

# Retrieves report for budget summary

```omg.query
{
  date?: date  // The date for the Bank Summary report e.g. 2018-03-31
  periods?: integer  // The number of periods to compare (integer between 1 and 12)
  timeframe?: integer  // The period size to compare to (1=month, 3=quarter, 12=year)
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
