---
method: GET
path: /Reports
operationId: getReportsList
tags:
  - Accounting
summary: Retrieves a list of the organistaions unique reports that require a uuid to fetch
---

# Retrieves a list of the organistaions unique reports that require a uuid to fetch

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
ReportWithRows
```
