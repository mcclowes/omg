---
method: GET
path: /Contacts/{ContactID}/Attachments/{AttachmentID}
operationId: getContactAttachmentById
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves a specific attachment from a specific contact using a unique attachment Id

```omg.path
{
  ContactID: uuid  // Unique identifier for a Contact
  AttachmentID: uuid  // Unique identifier for Attachment object
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
