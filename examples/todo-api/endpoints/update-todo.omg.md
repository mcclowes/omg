---
method: PATCH
path: /todos/{id}
operationId: update-todo
tags: [Todos]
---

# Update Todo

Updates an existing todo. Only provided fields will be updated.

```omg.path
{
  id: uuid  // Unique todo identifier
}
```

```omg.body
{
  title?: string @minLength(1) @maxLength(200),
  description?: string @maxLength(2000),
  completed?: boolean,
  priority?: "low" | "medium" | "high",
  due_date?: date
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
  "description": "Milk, eggs, bread, cheese",
  "completed": true,
  "priority": "medium",
  "due_date": "2024-12-20",
  "created_at": "2024-12-15T10:30:00Z",
  "updated_at": "2024-12-15T14:22:00Z"
}
```

{{> error }}
