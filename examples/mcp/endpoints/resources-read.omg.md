---
method: POST
path: /mcp
operationId: resources-read
tags: [Resources]
summary: Read resource content
---

# Read Resource

Retrieve the contents of a specific resource.

The resource URI must be one returned by `resources/list` or match
a resource template.

## JSON-RPC Method

`resources/read`

## Request

```omg.body
{
  jsonrpc: "2.0",
  id: string | integer,
  method: "resources/read",
  params: {
    uri: string                           // Resource URI to read
  }
}
```

## Response

```omg.response
{
  jsonrpc: "2.0",
  id: string | integer,
  result: {
    contents: ResourceContents[]
  }
}
```

## Content Types

Resources can contain text or binary content. For text-based content, the
`text` field is populated. For binary content (images, PDFs, etc.), the
`blob` field contains base64-encoded data.

## Errors

- Resource not found: JSON-RPC error with appropriate message
- Permission denied: JSON-RPC error
- Resource temporarily unavailable: Error with retry hints
