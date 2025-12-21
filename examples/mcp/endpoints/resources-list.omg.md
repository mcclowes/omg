---
method: POST
path: /mcp
operationId: resources-list
tags: [Resources]
summary: List available resources
---

# List Resources

Returns the list of resources available from the MCP server.

Resources are data sources that provide context to the AI assistant.
They can be static (files, databases) or dynamic (live data feeds).

## JSON-RPC Method

`resources/list`

## Request

```omg.body
{
  jsonrpc: "2.0",
  id: string | integer,
  method: "resources/list",
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
    resources: Resource[],
    nextCursor?: string
  }
}
```

## Resource URIs

Resources use URIs to identify content:
- `file:///path/to/file` - Local files
- `git://repo/path` - Git repository content
- `postgres://db/table` - Database content
- Custom schemes defined by the server
