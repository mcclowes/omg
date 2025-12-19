---
method: GET
path: /Contacts/{ContactID}/Attachments/{AttachmentID}
operationId: getContactAttachmentById
tags:
  - Accounting
summary: Retrieves a specific attachment from a specific contact using a unique attachment Id
---

# Retrieves a specific attachment from a specific contact using a unique attachment Id

```omg.path
{
  ContactID: uuid  // Unique identifier for a Contact
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
