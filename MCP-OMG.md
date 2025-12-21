# Documenting MCP in OMG

> Exploring how Model Context Protocol could be specified using OMG

## Overview

This document explores how [Model Context Protocol (MCP)](https://modelcontextprotocol.io) could be documented or defined using OMG (OpenAPI Markdown Grammar). MCP is Anthropic's open standard for connecting AI assistants to external data sources and tools.

## The Challenge

**MCP is not REST.** It's a JSON-RPC 2.0 protocol, which presents a fundamental mismatch with OMG's REST-focused design:

| Aspect | REST (OMG's target) | JSON-RPC (MCP) |
|--------|---------------------|----------------|
| Addressing | Multiple URLs | Single endpoint |
| Operations | HTTP methods (GET, POST, etc.) | Method names in payload |
| Parameters | URL path, query, headers, body | Single `params` object |
| Response routing | HTTP status codes | Error codes in payload |

However, there are compelling reasons to explore this:
1. MCP has an HTTP transport layer that could benefit from OpenAPI tooling
2. OMG's type system is excellent for documenting data schemas
3. The BEHAVIORS.md extensions (state machines, events) align well with MCP's concepts

---

## Approach 1: Document the HTTP Transport

The simplest approach - document MCP's Streamable HTTP transport as an OpenAPI-compatible API.

### The MCP Endpoint

```markdown
---
name: Model Context Protocol
version: 2025-11-25
baseUrl: https://example.com
---

# MCP - Model Context Protocol

JSON-RPC 2.0 protocol for AI assistant tool and resource access.

## Transport

MCP uses Streamable HTTP with a single endpoint accepting JSON-RPC messages.
```

### mcp-endpoint.omg.md

```markdown
---
method: POST
path: /mcp
operationId: mcp-request
tags: [MCP]
---

# MCP Request

Send a JSON-RPC 2.0 request to the MCP server.

All MCP operations flow through this endpoint. The `method` field in the
request body determines which operation to perform.

```omg.headers
{
  Content-Type: "application/json",
  Accept: "application/json" | "text/event-stream",
  Mcp-Session-Id?: string  // Required after initialization
}
```

```omg.body
{
  jsonrpc: "2.0",
  id: string | integer,
  method: string,
  params?: any
}
```

```omg.returns
200: JsonRpcResponse
  when method is valid
  "Successful JSON-RPC response"

200: SseStream
  when Accept includes "text/event-stream"
  "Server-Sent Event stream for multiple responses"

400: JsonRpcError
  when malformed request
  "Invalid JSON-RPC request"

404: JsonRpcError
  when method not found
  "Unknown method"
```
```

### Limitation

This approach is **accurate but shallow**. It documents the HTTP layer without capturing what makes MCP useful - the actual operations and their semantics.

---

## Approach 2: Virtual Endpoints per RPC Method

Map each JSON-RPC method to a "virtual endpoint" for documentation purposes.

### Method Naming Convention

Use fragment identifiers or a custom path scheme:

```
POST /mcp#initialize      → Initialize connection
POST /mcp#tools/list      → List available tools
POST /mcp#tools/call      → Call a tool
POST /mcp#resources/list  → List resources
POST /mcp#resources/read  → Read a resource
```

### Example: tools/list

```markdown
---
method: POST
path: /mcp#tools/list
operationId: tools-list
tags: [Tools]
---

# List Tools

Returns the list of tools available from this MCP server.

Clients should call this after initialization to discover what tools
the server provides.

```omg.body
{
  jsonrpc: "2.0",
  id: string | integer,
  method: "tools/list",
  params?: {
    cursor?: string  // Pagination cursor from previous response
  }
}
```

```omg.response
{
  jsonrpc: "2.0",
  id: string | integer,
  result: {
    tools: Tool[],
    nextCursor?: string  // Present if more tools available
  }
}
```
```

### Example: tools/call

```markdown
---
method: POST
path: /mcp#tools/call
operationId: tools-call
tags: [Tools]
---

# Call Tool

Invoke a tool with the given arguments.

The tool must have been returned by `tools/list`. Arguments must match
the tool's `inputSchema`.

```omg.body
{
  jsonrpc: "2.0",
  id: string | integer,
  method: "tools/call",
  params: {
    name: string,           // Tool name from tools/list
    arguments?: object      // Arguments matching inputSchema
  }
}
```

```omg.returns
200: ToolCallSuccess
  when tool exists and arguments valid

200: ToolCallError
  when tool execution fails
  "Tool returned an error"

-32602: InvalidParams
  when arguments don't match inputSchema
  "Invalid tool arguments"

-32601: MethodNotFound
  when tool name not found
  "Unknown tool"
```
```

### Benefit

This approach provides **per-operation documentation** that's easy to navigate and understand.

---

## Approach 3: Extend OMG for RPC Protocols

Add first-class RPC support to OMG with new frontmatter fields and code blocks.

### Proposed Syntax

```markdown
---
protocol: jsonrpc
method: tools/list
operationId: tools-list
tags: [Tools]
---

# List Tools

Returns available tools from the MCP server.

```omg.params
{
  cursor?: string  // Pagination cursor
}
```

```omg.result
{
  tools: Tool[],
  nextCursor?: string
}
```

```omg.errors
-32601: "Method not found"
-32602: "Invalid params"
-32603: "Internal error"
```
```

### New Block Types

| Block | Purpose |
|-------|---------|
| `omg.params` | JSON-RPC params object |
| `omg.result` | Successful result schema |
| `omg.errors` | Error code definitions |

### Compilation Target

RPC methods would compile to:
1. **OpenAPI** - As POST endpoints with method-specific schemas
2. **JSON Schema** - Standalone schemas for params/result
3. **AsyncAPI** - For bidirectional communication patterns

---

## Approach 4: Schema-Only Documentation

Focus on MCP's data structures without transport semantics.

### types/mcp-primitives.omg.md

```markdown
# MCP Primitives

Core data types for the Model Context Protocol.

```omg.type Tool
{
  name: string,              // Unique tool identifier
  description?: string,      // Human-readable description
  inputSchema: JSONSchema    // JSON Schema for arguments
}
```

```omg.type Resource
{
  uri: string,               // Resource URI (e.g., file:///path)
  name: string,              // Display name
  description?: string,      // Human-readable description
  mimeType?: string          // Content type
}
```

```omg.type Prompt
{
  name: string,              // Unique prompt identifier
  description?: string,      // Human-readable description
  arguments?: PromptArgument[]
}
```

```omg.type PromptArgument
{
  name: string,
  description?: string,
  required?: boolean = false
}
```
```

### types/mcp-content.omg.md

```markdown
# MCP Content Types

Content types for tool results and resource data.

```omg.type TextContent
{
  type: "text",
  text: string
}
```

```omg.type ImageContent
{
  type: "image",
  data: string,       // Base64 encoded
  mimeType: string    // e.g., "image/png"
}
```

```omg.type ResourceContent
{
  type: "resource",
  resource: {
    uri: string,
    mimeType?: string,
    text?: string,
    blob?: string     // Base64 encoded binary
  }
}
```

```omg.type Content
TextContent | ImageContent | ResourceContent
```
```

### types/mcp-messages.omg.md

```markdown
# MCP Messages

JSON-RPC message types for MCP communication.

```omg.type JsonRpcRequest
{
  jsonrpc: "2.0",
  id: string | integer,
  method: string,
  params?: any
}
```

```omg.type JsonRpcResponse
{
  jsonrpc: "2.0",
  id: string | integer,
  result?: any,
  error?: JsonRpcError
}
```

```omg.type JsonRpcError
{
  code: integer,
  message: string,
  data?: any
}
```

```omg.type JsonRpcNotification
{
  jsonrpc: "2.0",
  method: string,
  params?: any
}
```
```

### Benefit

This approach uses OMG's **strengths** (readable type definitions) without forcing RPC into a REST mold.

---

## Approach 5: Behavioral Specification

Use OMG's proposed BEHAVIORS extensions to capture MCP's dynamic aspects.

### MCP Connection Lifecycle

```markdown
# MCP Connection

```omg.lifecycle ConnectionState
{
  Disconnected {
    -> Initializing via connect()
  }

  Initializing {
    -> Ready via initialized
      when server responds with capabilities
    -> Failed via error
  }

  Ready {
    -> Disconnected via disconnect()
    -> Disconnected via error

    allow tools/list, tools/call
    allow resources/list, resources/read
    allow prompts/list, prompts/get
  }

  Failed {
    terminal
  }

  initial: Disconnected
}
```
```

### Capability Negotiation

```markdown
# Capability System

MCP uses capability negotiation during initialization.

```omg.capabilities
{
  client: {
    roots?: boolean,        // Client can provide filesystem roots
    sampling?: boolean      // Client can handle sampling requests
  },
  server: {
    tools?: boolean,        // Server provides tools
    resources?: boolean,    // Server provides resources
    prompts?: boolean       // Server provides prompts
  }
}
```

```omg.invariants
# Server capabilities determine available methods
tools/list available when server.tools == true
resources/list available when server.resources == true
prompts/list available when server.prompts == true

# Client must support sampling if server requests it
sampling/createMessage requires client.sampling == true
```
```

---

## Recommended Approach: Hybrid

Combine approaches for maximum utility:

### 1. Schema Library (Approach 4)

Create comprehensive type definitions using existing OMG syntax:

```
mcp/
├── api.omg.md                    # Root document
├── types/
│   ├── primitives.omg.md         # Tool, Resource, Prompt
│   ├── content.omg.md            # TextContent, ImageContent, etc.
│   ├── messages.omg.md           # JSON-RPC types
│   └── capabilities.omg.md       # Capability schemas
├── methods/
│   ├── initialize.omg.md         # Initialize handshake
│   ├── tools-list.omg.md         # tools/list
│   ├── tools-call.omg.md         # tools/call
│   ├── resources-list.omg.md     # resources/list
│   ├── resources-read.omg.md     # resources/read
│   ├── prompts-list.omg.md       # prompts/list
│   └── prompts-get.omg.md        # prompts/get
└── transport/
    └── http.omg.md               # Streamable HTTP endpoint
```

### 2. Virtual Endpoints (Approach 2)

Document each method as a pseudo-endpoint for navigation:

```markdown
---
method: POST
path: /mcp
operationId: tools-call
tags: [Tools]
x-mcp-method: tools/call
---
```

### 3. Behavioral Extensions (Approach 5)

Add lifecycle and capability documentation using BEHAVIORS.md patterns.

---

## Implementation Roadmap

### Phase 1: Schema Documentation (Now)

Use existing OMG features:
- `omg.type` blocks for all MCP data structures
- Partials for shared schemas
- Good documentation prose

### Phase 2: RPC Extensions (Future)

Add OMG extensions if there's demand:
- `protocol: jsonrpc` frontmatter
- `omg.params` and `omg.result` blocks
- `omg.errors` for error code definitions

### Phase 3: Multi-Target Compilation

Extend the compiler:
- OpenAPI 3.1 (current)
- JSON Schema standalone
- AsyncAPI for bidirectional patterns
- TypeScript types directly

---

## Open Questions

1. **Is MCP a good use case for OMG?**
   - OMG's value is making REST APIs human-readable
   - MCP is JSON-RPC, not REST
   - May be stretching OMG beyond its design goals

2. **Should OMG support RPC protocols natively?**
   - JSON-RPC is simpler than REST in many ways
   - Could attract new users (gRPC, tRPC communities)
   - Risk: scope creep, diluted focus

3. **What's the compilation target?**
   - OpenAPI doesn't naturally express RPC
   - JSON Schema is schema-only (no operations)
   - AsyncAPI might be a better fit

4. **How do we handle bidirectional communication?**
   - MCP has client→server AND server→client messages
   - OMG currently only documents request→response
   - BEHAVIORS.md events could help here

---

## Conclusion

MCP can be documented in OMG through several approaches:

| Approach | Effort | Fidelity | Tooling |
|----------|--------|----------|---------|
| HTTP Transport | Low | Low | Full OpenAPI |
| Virtual Endpoints | Medium | Medium | OpenAPI with extensions |
| Schema Only | Low | Medium | Partial (types only) |
| RPC Extensions | High | High | Requires new tooling |
| Behavioral | Medium | High | Requires BEHAVIORS impl |

**Recommendation**: Start with **Schema-Only** (Approach 4) to document MCP's data structures, then explore **Virtual Endpoints** (Approach 2) for method documentation if there's demand.

---

## References

- [Model Context Protocol Specification](https://modelcontextprotocol.io/specification/2025-03-26)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol/modelcontextprotocol)
- [JSON-RPC 2.0 Specification](https://www.jsonrpc.org/specification)
- [OMG BEHAVIORS.md](./BEHAVIORS.md) - Behavioral extensions proposal
