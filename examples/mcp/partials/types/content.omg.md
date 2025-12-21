# MCP Content Types

Content types used in tool results, resource data, and prompt messages.

## Text Content

```omg.type
type TextContent = {
  type: "text",
  text: string                     // Plain text content
}
```

## Image Content

```omg.type
type ImageContent = {
  type: "image",
  data: string,                    // Base64-encoded image data
  mimeType: string                 // Image MIME type (e.g., "image/png")
}
```

## Audio Content

```omg.type
type AudioContent = {
  type: "audio",
  data: string,                    // Base64-encoded audio data
  mimeType: string                 // Audio MIME type (e.g., "audio/wav")
}
```

## Embedded Resource

```omg.type
type EmbeddedResource = {
  type: "resource",
  resource: ResourceContents
}
```

```omg.type
type ResourceContents = {
  uri: string,                     // Resource URI
  mimeType?: string,               // Content type
  text?: string,                   // Text content (if text-based)
  blob?: string                    // Base64-encoded binary (if binary)
}
```

## Content Union

```omg.type
type Content = TextContent | ImageContent | AudioContent | EmbeddedResource
```

## Annotations

```omg.type
type Annotations = {
  audience?: string[],             // Who should see this content
  priority?: number                // Importance (0=low, 1=high)
}
```
