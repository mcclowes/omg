---
method: GET
path: /ManualJournals/{ManualJournalID}/Attachments/{AttachmentID}
operationId: getManualJournalAttachmentById
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Allows you to retrieve a specific attachment from a specific manual journal using a unique attachment Id

```omg.path
{
  ManualJournalID: uuid  // Unique identifier for a ManualJournal
  AttachmentID: uuid  // Unique identifier for Attachment object
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
