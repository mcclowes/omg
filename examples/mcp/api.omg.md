---
name: Model Context Protocol
version: 2025-11-25
baseUrl: https://localhost:3000
contact:
  name: Anthropic
  url: https://modelcontextprotocol.io
---

# Model Context Protocol (MCP)

An open protocol for connecting AI assistants to external data sources and tools.

MCP enables AI applications to:
- Access **tools** for performing actions
- Read **resources** for context
- Use **prompts** for templated interactions

## Protocol

MCP uses JSON-RPC 2.0 over either stdio or HTTP transport.

## Types

@types/primitives
@types/content
@types/messages
@types/capabilities
