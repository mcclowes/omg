---
method: GET
path: /ManualJournals/{ManualJournalID}/Attachments/{FileName}
operationId: getManualJournalAttachmentByFileName
tags:
  - Accounting
summary: Retrieves a specific attachment from a specific manual journal by file name
---

# Retrieves a specific attachment from a specific manual journal by file name

```omg.path
{
  ManualJournalID: uuid  // Unique identifier for a ManualJournal
  FileName: string  // Name of the attachment
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  contentType: string  // The mime type of the attachment file you are retrieving i.e image/jpg, application/pdf
}
```

```omg.response
string @format("binary")
```
