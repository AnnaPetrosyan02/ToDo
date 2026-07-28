import { useState, useEffect } from "react";
import type { ITodo, Priority } from "./types/todo";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";
import "./App.css";

const LOCAL_STORAGE_KEY = "my_todo_notebook_app";

export function App() {
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved) as ITodo[];
      } catch (e) {
        console.error("Ошибка localStorage:", e);
      }
    }
    return [
      {
        id: "1",
        title: "Начать думать над курсовой",
        description: "Выбрать тему и создатать репозиторий на GitHub",
        completed: false,
        priority: "high"
      },
      {
        id: "2",
        title: "Выпить чашку чая",
        description: "Сделать перерыв на 15 минут",
        completed: true,
        priority: "low"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (title: string, priority: Priority, description?: string) => {
    const newTodo: ITodo = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      priority
    };
    setTodos((prev) => [newTodo, ...prev]);
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
    <div className="notebook-container">
      <h1 className="notebook-title">Мой список дел</h1>
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