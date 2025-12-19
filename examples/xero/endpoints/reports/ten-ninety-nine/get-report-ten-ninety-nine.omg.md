---
method: GET
path: /Reports/TenNinetyNine
operationId: getReportTenNinetyNine
tags:
  - Accounting
summary: Retrieve reports for 1099
---

# Retrieve reports for 1099

```omg.query
{
  reportYear?: string  // The year of the 1099 report
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
Reports
```
