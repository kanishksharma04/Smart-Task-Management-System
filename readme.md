# Smart Task Management System

A modern, efficient task management system built with Next.js, incorporating Object-Oriented Programming (OOP) principles and design patterns.

## Project Structure

- `/src`: Next.js source code
- `/docs`: Documentation and SDLC process
- `/diagrams`: ER diagrams and class relationships
- `/db`: Database connection and configuration scripts

## Design Progress

### Object-Oriented Programming (OOP)
- **Classes**: User, Task, Project, Category
- **Interfaces**: ITaskAction, IProjectAction
- **Relationships**: A User can have multiple Projects, and a Project can have multiple Tasks.

### Design Pattern
- **Singleton Pattern**: Used for the Database connection management to ensure only one instance is active throughout the application lifecycle. See `db/database.js`.

### ER Diagram
A detailed ER diagram is available in [er_diagram.md](file:///Users/deepanshu./Desktop/Smart-Task-Management-System/diagrams/er_diagram.md).

### SDLC
We follow an **Agile SDLC** approach, allowing for iterative development and frequent updates. See [sdlc.md](file:///Users/deepanshu./Desktop/Smart-Task-Management-System/docs/sdlc.md).

## Getting Started

1. Copy `.env.example` to `.env.local`
2. Add your `MONGODB_URI` connection string to `.env.local`
3. Run `npm install`
4. Run `npm run dev`

> `.env.local` is already ignored by Git via `.gitignore`, so your credentials stay local.
