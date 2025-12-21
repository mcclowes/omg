---
method: POST
path: /mcp
operationId: prompts-list
tags: [Prompts]
summary: List available prompts
---

# List Prompts

Returns the list of prompt templates available from the MCP server.

Prompts are pre-defined templates that help structure interactions
with the AI assistant.

## JSON-RPC Method

`prompts/list`

## Request

```omg.body
{
  jsonrpc: "2.0",
  id: string | integer,
  method: "prompts/list",
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
    prompts: Prompt[],
    nextCursor?: string
  }
}
```
