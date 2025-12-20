---
method: GET
path: /Contacts/{ContactID}/Attachments/{FileName}
operationId: getContactAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves a specific attachment from a specific contact by file name

```omg.path
{
  ContactID: uuid  // Unique identifier for a Contact
  FileName: string  // Name of the attachment
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
