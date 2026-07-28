import React, { useState } from "react";
import type { Priority } from "../types/todo";

interface TodoFormProps {
  onAddTodo: (title: string, priority: Priority) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTodo(title, priority);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Название задачи..."
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
      />
      
      <select
        value={priority}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
          setPriority(e.target.value as Priority)
        }
      >
        <option value="low">Низкий</option>
        <option value="medium">Средний</option>
        <option value="high">Высокий</option>
      </select>

      <button type="submit">Добавить</button>
    </form>
  );
};