---
method: GET
path: /Reports/ProfitAndLoss
operationId: getReportProfitAndLoss
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.reports.read
---

# Retrieves report for profit and loss

```omg.query
{
  timeframe?: "MONTH" | "QUARTER" | "YEAR"  // The period size to compare to (MONTH, QUARTER, YEAR)
  trackingCategoryID?: string  // The trackingCategory 1 for the ProfitAndLoss report
  trackingCategoryID2?: string  // The trackingCategory 2 for the ProfitAndLoss report
  trackingOptionID?: string  // The tracking option 1 for the ProfitAndLoss report
  trackingOptionID2?: string  // The tracking option 2 for the ProfitAndLoss report
  standardLayout?: boolean  // Return the standard layout for the ProfitAndLoss report
}
```

```omg.response
ReportWithRows
```

{{> query/from-date }}

{{> query/to-date }}

{{> query/periods }}

{{> query/payments-only }}

{{> headers/xero-tenant-id }}
