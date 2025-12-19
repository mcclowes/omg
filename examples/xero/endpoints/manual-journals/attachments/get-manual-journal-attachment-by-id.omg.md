---
method: GET
path: /ManualJournals/{ManualJournalID}/Attachments/{AttachmentID}
operationId: getManualJournalAttachmentById
tags:
  - Accounting
summary: Allows you to retrieve a specific attachment from a specific manual journal using a unique attachment Id
---

# Allows you to retrieve a specific attachment from a specific manual journal using a unique attachment Id

```omg.path
{
  ManualJournalID: uuid  // Unique identifier for a ManualJournal
  AttachmentID: uuid  // Unique identifier for Attachment object
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
