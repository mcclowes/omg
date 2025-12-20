---
method: GET
path: /Reports/BankSummary
operationId: getReportBankSummary
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.reports.read
---

# Retrieves report for bank summary

```omg.response
ReportWithRows
```

{{> query/from-date }}

{{> query/to-date }}

{{> headers/xero-tenant-id }}
