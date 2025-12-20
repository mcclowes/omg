# Idempotency Key

Common header parameter used by 99 endpoints.

```omg.headers
{
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```
