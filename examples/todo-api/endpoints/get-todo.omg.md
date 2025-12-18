---
method: GET
path: /todos/{id}
operationId: get-todo
tags: [Todos]
---

# Get Todo

Returns a single todo by its ID.

```omg.path
{
  id: uuid  // Unique todo identifier
}
```

```omg.response
{
  id: uuid,
  title: string,
  description: string?,
  completed: boolean,
  priority: "low" | "medium" | "high",
  due_date: date?,
  created_at: datetime,
  updated_at: datetime
}
```

```omg.example
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "priority": "medium",
  "due_date": "2024-12-20",
  "created_at": "2024-12-15T10:30:00Z",
  "updated_at": "2024-12-15T10:30:00Z"
}
```

{{> error }}
