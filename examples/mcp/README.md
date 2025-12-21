# MCP Example

This example demonstrates documenting the [Model Context Protocol (MCP)](https://modelcontextprotocol.io) using OMG.

## About MCP

MCP is an open protocol developed by Anthropic for connecting AI assistants to external data sources and tools. It uses JSON-RPC 2.0 over stdio or HTTP transport.

## Structure

```
mcp/
├── api.omg.md                    # Root API document
├── partials/types/
│   ├── primitives.omg.md         # Tool, Resource, Prompt types
│   ├── content.omg.md            # Content types (Text, Image, etc.)
│   ├── messages.omg.md           # JSON-RPC message types
│   └── capabilities.omg.md       # Capability negotiation types
└── endpoints/
    ├── initialize.omg.md         # Connection initialization
    ├── tools-list.omg.md         # List available tools
    ├── tools-call.omg.md         # Invoke a tool
    ├── resources-list.omg.md     # List available resources
    ├── resources-read.omg.md     # Read resource content
    ├── prompts-list.omg.md       # List prompt templates
    └── prompts-get.omg.md        # Get a prompt
```

## Building

```bash
# From the repository root
npm run build

# Build this example
node packages/omg-md-cli/dist/cli.js build examples/mcp/api.omg.md -o mcp-openapi.yaml
```

## What This Demonstrates

### Strengths

1. **Schema Documentation** - OMG's type system excels at documenting MCP's data structures (Tool, Resource, Content, etc.) in a readable format
2. **Human-Readable Specs** - The Markdown prose makes the protocol accessible to non-programmers
3. **Compiles to OpenAPI** - Types are correctly translated to JSON Schema in the output

### Limitations

Since MCP is a JSON-RPC protocol (not REST), this example reveals some challenges:

1. **Single Path** - All MCP operations use `POST /mcp`, which OpenAPI handles as a single endpoint
2. **No HTTP Status Differentiation** - MCP errors are in the JSON-RPC response body, not HTTP status codes
3. **Method Overloading** - OpenAPI can only have one operation per path/method combination

The compiled OpenAPI output shows only the last endpoint definition for `POST /mcp` because OpenAPI doesn't support multiple operations on the same path/method.

## Recommended Use

For MCP, the **Schema-Only** approach works best:

1. Use OMG's type system to document all data structures
2. Maintain the endpoint files for human-readable documentation
3. Accept that the OpenAPI output is primarily useful for schema definitions

See [MCP-OMG.md](../../MCP-OMG.md) for a detailed exploration of approaches.

## References

- [MCP Specification](https://modelcontextprotocol.io/specification/2025-03-26)
- [MCP GitHub](https://github.com/modelcontextprotocol/modelcontextprotocol)
- [JSON-RPC 2.0](https://www.jsonrpc.org/specification)
