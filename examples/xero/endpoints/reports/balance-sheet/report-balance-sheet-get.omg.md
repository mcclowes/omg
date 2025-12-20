---
method: GET
path: /Reports/BalanceSheet
operationId: getReportBalanceSheet
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.reports.read
---

# Retrieves report for balancesheet

```omg.query
{
  timeframe?: "MONTH" | "QUARTER" | "YEAR"  // The period size to compare to (MONTH, QUARTER, YEAR)
  trackingOptionID1?: string  // The tracking option 1 for the Balance Sheet report
  trackingOptionID2?: string  // The tracking option 2 for the Balance Sheet report
  standardLayout?: boolean  // The standard layout boolean for the Balance Sheet report
}
```

```omg.response
ReportWithRows
```

{{> query/date }}

{{> query/periods }}

{{> query/payments-only }}

{{> headers/xero-tenant-id }}
