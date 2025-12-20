---
method: GET
path: /Journals
operationId: getJournals
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.journals.read
---

# Retrieves journals

```omg.query
{
  offset?: integer  // Offset by a specified journal number. e.g. journals with a JournalNumber greater than the offset will be returned
}
```

```omg.response
Journals
```

{{> query/payments-only }}

{{> headers/xero-tenant-id }}

{{> headers/if-modified-since }}
