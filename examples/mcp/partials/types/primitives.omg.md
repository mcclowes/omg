# MCP Primitive Types

Core data structures for the Model Context Protocol.

## Tools

```omg.type
type Tool = {
  name: string,                    // Unique identifier for the tool
  description?: string,            // Human-readable description
  inputSchema?: object             // JSON Schema defining expected arguments
}
```

```omg.type
type ToolCallResult = {
  content: Content[],              // Tool output content
  isError?: boolean                // Whether this represents an error
}
```

## Resources

```omg.type
type Resource = {
  uri: string,                     // Unique URI (e.g., file:///path)
  name: string,                    // Display name
  description?: string,            // Human-readable description
  mimeType?: string                // Content type hint
}
```

```omg.type
type ResourceTemplate = {
  uriTemplate: string,             // URI template with placeholders
  name: string,
  description?: string,
  mimeType?: string
}
```

## Prompts

```omg.type
type Prompt = {
  name: string,                    // Unique identifier
  description?: string,            // Human-readable description
  arguments?: PromptArgument[]     // Arguments the prompt accepts
}
```

```omg.type
type PromptArgument = {
  name: string,                    // Argument name
  description?: string,            // Human-readable description
  required?: boolean               // Whether argument is required
}
```

```omg.type
type PromptMessage = {
  role: "user" | "assistant",      // Message role
  content: Content                 // Message content
}
```
