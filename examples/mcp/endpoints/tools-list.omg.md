---
method: POST
path: /mcp
operationId: tools-list
tags: [Tools]
summary: List available tools
---

# List Tools

Returns the list of tools available from the MCP server.

Clients should call this after initialization to discover available tools.
The server may send a `notifications/tools/list_changed` notification when
tools change.

## JSON-RPC Method

`tools/list`

## Request

```omg.body
{
  jsonrpc: "2.0",
  id: string | integer,
  method: "tools/list",
  params?: {
    cursor?: string                       // Pagination cursor
  }
}
```

## Response

```omg.response
{
  jsonrpc: "2.0",
  id: string | integer,
  result: {
    tools: Tool[],
    nextCursor?: string                   // Present if more pages exist
  }
}
```

## Tool Schema

Each tool includes:
- `name` - Unique identifier used when calling the tool
- `description` - Human-readable explanation of what the tool does
- `inputSchema` - JSON Schema defining the expected arguments

## Pagination

If the server has many tools, it may paginate the response. When `nextCursor`
is present, send another request with that cursor to get more tools.
