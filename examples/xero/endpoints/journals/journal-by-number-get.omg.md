---
method: GET
path: /Journals/{JournalNumber}
operationId: getJournalByNumber
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.journals.read
---

# Retrieves a specific journal using a unique journal number.

```omg.path
{
  JournalNumber: integer  // Number of a Journal
}
```

```omg.response
Journals
```

{{> headers/xero-tenant-id }}
