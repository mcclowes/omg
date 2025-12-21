# MCP Capabilities

Capability negotiation types for MCP connection initialization.

## Client Capabilities

```omg.type
type ClientCapabilities = {
  experimental?: object,           // Experimental features
  roots?: RootsCapability,
  sampling?: object                // Client can handle sampling requests
}
```

```omg.type
type RootsCapability = {
  listChanged?: boolean            // Client supports roots/list_changed
}
```

## Server Capabilities

```omg.type
type ServerCapabilities = {
  experimental?: object,           // Experimental features
  logging?: object,                // Server supports logging
  completions?: object,            // Server supports completions
  prompts?: PromptsCapability,
  resources?: ResourcesCapability,
  tools?: ToolsCapability
}
```

```omg.type
type PromptsCapability = {
  listChanged?: boolean            // Server emits prompts/list_changed
}
```

```omg.type
type ResourcesCapability = {
  subscribe?: boolean,             // Server supports resource subscriptions
  listChanged?: boolean            // Server emits resources/list_changed
}
```

```omg.type
type ToolsCapability = {
  listChanged?: boolean            // Server emits tools/list_changed
}
```

## Implementation Info

```omg.type
type Implementation = {
  name: string,                    // Implementation name
  version: string                  // Implementation version
}
```

## Initialize Params

```omg.type
type InitializeParams = {
  protocolVersion: string,         // Requested protocol version
  capabilities: ClientCapabilities,
  clientInfo: Implementation
}
```

## Initialize Result

```omg.type
type InitializeResult = {
  protocolVersion: string,         // Negotiated protocol version
  capabilities: ServerCapabilities,
  serverInfo: Implementation,
  instructions?: string            // Human-readable server instructions
}
```
