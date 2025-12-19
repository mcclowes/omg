---
method: POST
path: /ManualJournals/{ManualJournalID}/Attachments/{FileName}
operationId: updateManualJournalAttachmentByFileName
tags:
  - Accounting
summary: Updates a specific attachment from a specific manual journal by file name
---

# Updates a specific attachment from a specific manual journal by file name

```omg.path
{
  ManualJournalID: uuid  // Unique identifier for a ManualJournal
  FileName: string  // Name of the attachment
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
string @format("byte")
```

```omg.response
Attachments
```

```omg.response.400
Error
```
