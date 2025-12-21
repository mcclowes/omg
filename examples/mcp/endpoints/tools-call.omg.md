---
method: POST
path: /mcp
operationId: tools-call
tags: [Tools]
summary: Call a tool
---

# Call Tool

Invoke a tool with the provided arguments.

The tool must exist (returned by `tools/list`) and arguments must match
the tool's `inputSchema`.

## JSON-RPC Method

`tools/call`

## Request

```omg.body
{
  jsonrpc: "2.0",
  id: string | integer,
  method: "tools/call",
  params: {
    name: string,                         // Tool name from tools/list
    arguments?: object                    // Arguments matching inputSchema
  }
}
```

## Response

```omg.response
{
  jsonrpc: "2.0",
  id: string | integer,
  result: ToolCallResult
}
```

## Error Handling

Tools can fail in two ways:

1. **Protocol error** - Invalid tool name or arguments (JSON-RPC error)
2. **Execution error** - Tool ran but failed (`isError: true` in result)

## Progress Notifications

Long-running tools can report progress. Include a `progressToken` in the
request metadata, and the server will send `notifications/progress` messages.
