---
method: PUT
path: /ManualJournals/{ManualJournalID}/Attachments/{FileName}
operationId: createManualJournalAttachmentByFileName
tags:
  - Accounting
summary: Creates a specific attachment for a specific manual journal by file name
---

# Creates a specific attachment for a specific manual journal by file name

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
