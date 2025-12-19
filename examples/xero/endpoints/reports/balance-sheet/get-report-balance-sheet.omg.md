---
method: GET
path: /Reports/BalanceSheet
operationId: getReportBalanceSheet
tags:
  - Accounting
summary: Retrieves report for balancesheet
---

# Retrieves report for balancesheet

```omg.query
{
  date?: date  // The date of the Balance Sheet report
  periods?: integer  // The number of periods for the Balance Sheet report
  timeframe?: "MONTH" | "QUARTER" | "YEAR"  // The period size to compare to (MONTH, QUARTER, YEAR)
  trackingOptionID1?: string  // The tracking option 1 for the Balance Sheet report
  trackingOptionID2?: string  // The tracking option 2 for the Balance Sheet report
  standardLayout?: boolean  // The standard layout boolean for the Balance Sheet report
  paymentsOnly?: boolean  // return a cash basis for the Balance Sheet report
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
