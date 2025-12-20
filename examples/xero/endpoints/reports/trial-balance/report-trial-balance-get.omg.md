---
method: GET
path: /Reports/TrialBalance
operationId: getReportTrialBalance
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.reports.read
---

# Retrieves report for trial balance

```omg.response
ReportWithRows
```

{{> query/date }}

{{> query/payments-only }}

{{> headers/xero-tenant-id }}
