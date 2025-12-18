---
method: GET
path: /todos
operationId: list-todos
tags: [Todos]
---

# List Todos

Returns a paginated list of todos. Optionally filter by completion status.

```omg.query
{
  status?: "pending" | "completed" | "all",  // Filter by status (default: all)
  limit?: integer @min(1) @max(100),         // Max items to return (default: 20)
  offset?: integer @min(0)                   // Number of items to skip (default: 0)
}
```

```omg.response
{
  data: [{
    id: uuid,
    title: string,
    description: string?,
    completed: boolean,
    priority: "low" | "medium" | "high",
    due_date: date?,
    created_at: datetime,
    updated_at: datetime
  }],
  pagination: {
    total: integer,
    limit: integer,
    offset: integer,
    has_more: boolean
  }
}
```

```omg.example
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "completed": false,
      "priority": "medium",
      "due_date": "2024-12-20",
      "created_at": "2024-12-15T10:30:00Z",
      "updated_at": "2024-12-15T10:30:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "title": "Finish project",
      "completed": true,
      "priority": "high",
      "created_at": "2024-12-10T08:00:00Z",
      "updated_at": "2024-12-14T16:45:00Z"
    }
  ],
  "pagination": {
    "total": 42,
    "limit": 20,
    "offset": 0,
    "has_more": true
  }
}
```

{{> error }}
