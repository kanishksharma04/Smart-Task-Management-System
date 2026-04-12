# ER Diagram

```mermaid
erDiagram
    PROJECT ||--o{ TASK : contains

    PROJECT {
        string id PK
        string name
        string description
        datetime createdAt
        datetime updatedAt
    }

    TASK {
        string id PK
        string title
        string description
        string status
        string priority
        datetime deadline
        datetime createdAt
        datetime updatedAt
    }
```

## Entities and Relationships

- **PROJECT**: Represents a task project with a list of tasks.
- **TASK**: Represents an individual task belonging to a project.
- **Relationship**: One `PROJECT` contains many `TASK` entities.
- **Notes**: `TASK.deadline` is optional in the model; `priority` is one of `low`, `medium`, `high`.
