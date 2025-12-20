---
method: GET
path: /Reports/{ReportID}
operationId: getReportFromId
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.reports.read
---

# Retrieves a specific report using a unique ReportID

```omg.path
{
  ReportID: string  // Unique identifier for a Report
}
```

```omg.response
ReportWithRows
```

{{> headers/xero-tenant-id }}
