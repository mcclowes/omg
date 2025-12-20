# Summarize Errors

Common query parameter used by 25 endpoints.

```omg.query
{
  summarizeErrors?: boolean @default(false)  // If false return 200 OK and mix of successfully created objects and any with validation errors
}
```
