---
method: GET
path: /Reports/AgedReceivablesByContact
operationId: getReportAgedReceivablesByContact
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.reports.read
---

# Retrieves report for aged receivables by contact

```omg.query
{
  contactId: uuid  // Unique identifier for a Contact
}
```

```omg.response
ReportWithRows
```

{{> query/date }}

{{> query/from-date }}

{{> query/to-date }}

{{> headers/xero-tenant-id }}
