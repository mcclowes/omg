---
method: POST
path: /mcp
operationId: prompts-get
tags: [Prompts]
summary: Get a prompt with arguments
---

# Get Prompt

Retrieve a prompt template with the specified arguments filled in.

Returns the prompt as a list of messages ready to be used in a
conversation.

## JSON-RPC Method

`prompts/get`

## Request

```omg.body
{
  jsonrpc: "2.0",
  id: string | integer,
  method: "prompts/get",
  params: {
    name: string,                         // Prompt name from prompts/list
    arguments?: object                    // Argument values
  }
}
```

## Response

```omg.response
{
  jsonrpc: "2.0",
  id: string | integer,
  result: {
    description?: string,                 // Prompt description
    messages: PromptMessage[]             // Prompt content as messages
  }
}
```

## Message Content

Prompt messages can contain:
- **Text** - Plain text instructions
- **Images** - Visual context
- **Embedded resources** - Data from resources/read
