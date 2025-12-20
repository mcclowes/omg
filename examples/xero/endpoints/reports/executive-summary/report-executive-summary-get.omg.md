---
method: GET
path: /Reports/ExecutiveSummary
operationId: getReportExecutiveSummary
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.reports.read
---

# Retrieves report for executive summary

```omg.response
ReportWithRows
```

{{> query/date }}

{{> headers/xero-tenant-id }}
