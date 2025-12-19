---
method: GET
path: /Reports/{ReportID}
operationId: getReportFromId
tags:
  - Accounting
summary: Retrieves a specific report using a unique ReportID
---

# Retrieves a specific report using a unique ReportID

```omg.path
{
  ReportID: string  // Unique identifier for a Report
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
