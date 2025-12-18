# Standard Error Responses

```omg.response.400
{
  error: {
    type: "invalid_request_error",
    code?: string,
    message: string,
    param?: string
  }
}
```

```omg.response.401
{
  error: {
    type: "authentication_error",
    message: "Invalid API key provided"
  }
}
```

```omg.response.429
{
  error: {
    type: "rate_limit_error",
    message: string
  }
}
```

```omg.response.500
{
  error: {
    type: "api_error",
    message: "An unexpected error occurred"
  }
}
```
