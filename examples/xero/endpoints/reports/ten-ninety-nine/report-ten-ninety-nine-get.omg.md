---
method: GET
path: /Reports/TenNinetyNine
operationId: getReportTenNinetyNine
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.reports.read
      - accounting.reports.tenninetynine.read
---

# Retrieve reports for 1099

```omg.query
{
  reportYear?: string  // The year of the 1099 report
}
```

```omg.response
Reports
```

{{> headers/xero-tenant-id }}
