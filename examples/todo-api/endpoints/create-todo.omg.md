---
method: POST
path: /todos
operationId: create-todo
tags: [Todos]
---

# Create Todo

Creates a new todo item.

```omg.body
{
  title: string @minLength(1) @maxLength(200),  // Todo title (required)
  description?: string @maxLength(2000),        // Detailed description
  priority?: "low" | "medium" | "high",         // Priority level (default: medium)
  due_date?: date                               // Optional due date
}
```

```omg.response.201
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
  "id": "550e8400-e29b-41d4-a716-446655440002",
  "title": "Learn OMG syntax",
  "description": "Read the documentation and try the examples",
  "completed": false,
  "priority": "high",
  "due_date": "2024-12-25",
  "created_at": "2024-12-15T11:00:00Z",
  "updated_at": "2024-12-15T11:00:00Z"
}
```

{{> error }}
