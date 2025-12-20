---
method: GET
path: /Reports
operationId: getReportsList
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.reports.read
---

# Retrieves a list of the organistaions unique reports that require a uuid to fetch

```omg.response
ReportWithRows
```

{{> headers/xero-tenant-id }}
