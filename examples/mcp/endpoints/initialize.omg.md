---
method: POST
path: /mcp
operationId: initialize
tags: [Lifecycle]
summary: Initialize MCP connection
---

# Initialize

Establish an MCP connection and negotiate capabilities.

This must be the first message sent by the client. The server responds with
its capabilities and protocol version. After receiving the response, the
client must send an `initialized` notification.

## JSON-RPC Method

`initialize`

## Request

```omg.body
{
  jsonrpc: "2.0",
  id: string | integer,
  method: "initialize",
  params: InitializeParams
}
```

## Response

```omg.response
{
  jsonrpc: "2.0",
  id: string | integer,
  result: InitializeResult
}
```

## Protocol Version Negotiation

The client sends its preferred protocol version. The server responds with
the version it will use, which may be the same or an earlier compatible
version. If the server cannot support any compatible version, it returns
an error.
