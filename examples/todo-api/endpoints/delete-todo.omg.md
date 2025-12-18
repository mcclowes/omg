---
method: DELETE
path: /todos/{id}
operationId: delete-todo
tags: [Todos]
---

# Delete Todo

Permanently deletes a todo.

```omg.path
{
  id: uuid  // Unique todo identifier
}
```

{{> error }}
