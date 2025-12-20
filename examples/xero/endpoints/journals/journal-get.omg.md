---
method: GET
path: /Journals/{JournalID}
operationId: getJournal
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.journals.read
---

# Retrieves a specific journal using a unique journal Id.

```omg.path
{
  JournalID: uuid  // Unique identifier for a Journal
}
```

```omg.response
Journals
```

{{> headers/xero-tenant-id }}
