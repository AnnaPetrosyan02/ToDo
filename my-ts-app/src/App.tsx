import { useState } from "react";
import type { ITodo, Priority } from "./types/todo";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";

export function App() {
  const [todos, setTodos] = useState<ITodo[]>([
    { id: "1", title: "Изучить React + TS", completed: true, priority: "high" },
    { id: "2", title: "Сделать итоговое задание", completed: false, priority: "high" }
  ]);

  const handleAddTodo = (title: string, priority: Priority) => {
    const newTodo: ITodo = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Список задач (React + TypeScript)</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;