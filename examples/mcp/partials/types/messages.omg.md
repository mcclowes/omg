# MCP Message Types

JSON-RPC 2.0 message structures for MCP communication.

## Base Messages

```omg.type
type JsonRpcRequest = {
  jsonrpc: "2.0",                  // Protocol version (always "2.0")
  id: string | integer,            // Request identifier
  method: string,                  // Method name (e.g., "tools/list")
  params?: object                  // Method parameters
}
```

```omg.type
type JsonRpcResponse = {
  jsonrpc: "2.0",
  id: string | integer,            // Matches request id
  result?: any,                    // Success result
  error?: JsonRpcError             // Error details
}
```

```omg.type
type JsonRpcNotification = {
  jsonrpc: "2.0",
  method: string,                  // Notification method
  params?: object                  // Notification parameters
}
```

## Error Structure

```omg.type
type JsonRpcError = {
  code: integer,                   // Error code
  message: string,                 // Human-readable error message
  data?: any                       // Additional error information
}
```

## Progress Notifications

```omg.type
type ProgressParams = {
  progressToken: string | integer, // Token from original request
  progress: number,                // Current progress (0-100)
  total?: number                   // Total expected (if known)
}
```

## Cancellation

```omg.type
type CancelledParams = {
  requestId: string | integer,     // ID of request being cancelled
  reason?: string                  // Cancellation reason
}
```
