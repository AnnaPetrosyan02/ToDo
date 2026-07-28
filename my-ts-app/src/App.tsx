import { useState, useEffect } from "react";
import type { ITodo, Priority } from "./types/todo";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";

const LOCAL_STORAGE_KEY = "my_todo_app_tasks";

export function App() {
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    
    if (saved) {
      try {
        return JSON.parse(saved) as ITodo[];
      } catch (error) {
        console.error("Ошибка чтения из localStorage:", error);
      }
    }

    return [
      { id: "1", title: "Изучить React + TS", completed: true, priority: "high" },
      { id: "2", title: "Сделать итоговое задание", completed: false, priority: "high" }
    ];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

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