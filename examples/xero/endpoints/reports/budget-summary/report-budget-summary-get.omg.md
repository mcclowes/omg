---
method: GET
path: /Reports/BudgetSummary
operationId: getReportBudgetSummary
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.reports.read
---

# Retrieves report for budget summary

```omg.query
{
  timeframe?: integer  // The period size to compare to (1=month, 3=quarter, 12=year)
}
```

```omg.response
ReportWithRows
```

{{> query/date }}

{{> query/periods }}

{{> headers/xero-tenant-id }}
