---
method: GET
path: /Reports/ProfitAndLoss
operationId: getReportProfitAndLoss
tags:
  - Accounting
summary: Retrieves report for profit and loss
---

# Retrieves report for profit and loss

```omg.query
{
  fromDate?: date  // filter by the from date of the report e.g. 2021-02-01
  toDate?: date  // filter by the to date of the report e.g. 2021-02-28
  periods?: integer  // The number of periods to compare (integer between 1 and 12)
  timeframe?: "MONTH" | "QUARTER" | "YEAR"  // The period size to compare to (MONTH, QUARTER, YEAR)
  trackingCategoryID?: string  // The trackingCategory 1 for the ProfitAndLoss report
  trackingCategoryID2?: string  // The trackingCategory 2 for the ProfitAndLoss report
  trackingOptionID?: string  // The tracking option 1 for the ProfitAndLoss report
  trackingOptionID2?: string  // The tracking option 2 for the ProfitAndLoss report
  standardLayout?: boolean  // Return the standard layout for the ProfitAndLoss report
  paymentsOnly?: boolean  // Return cash only basis for the ProfitAndLoss report
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
