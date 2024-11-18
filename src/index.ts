import express, { Application, Request, Response } from "express";

const app: Application = express();
const port = 3000;

app.use(express.json());

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [];
let currentId = 1;

// endpoint 1 -- CREATE
app.post("/todos", (req: Request, res: any) => {
  const { title, completed = false } = req.body;
  console.log(req.body);

  if (!title) {
    return res.status(400).json({ error: "titre requis" });
  }

  const newTodo: Todo = { id: currentId++, title, completed };
  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// endpoint 2 -- READ
app.get("/todos", (req: Request, res: Response) => {
  res.json(todos);
});

// endpoint 3 -- UPDATE
app.put("/todos/:id", (req: Request, res: any) => {
  const id = parseInt(req.params.id, 10);
  const { title, completed } = req.body;

  // compare les id
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "todo introuvable" });
  }

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// endpoint -- DELETE
app.delete("/todos/:id", (req: Request, res: any) => {
  const id = parseInt(req.params.id, 10);

  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "todo introuvable" });
  }

  todos.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
