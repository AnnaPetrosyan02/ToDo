import React, { useState } from "react";
import type { Priority } from "../types/todo";

interface TodoFormProps {
  onAddTodo: (title: string, priority: Priority, description?: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTodo(title, priority, description.trim() || undefined);
    setTitle("");
    setDescription("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input-field"
        placeholder="Заголовок задачи..."
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
      />

      <textarea
        className="textarea-field"
        placeholder="Заметка к задаче (опционально)..."
        value={description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
      />

      <div className="form-row">
        <select
          className="select-field"
          value={priority}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPriority(e.target.value as Priority)
          }
        >
          <option value="low">Низкий приоритет</option>
          <option value="medium">Средний приоритет</option>
          <option value="high">Высокий приоритет</option>
        </select>

        <button type="submit" className="btn-add">
          Записать ✏️
        </button>
      </div>
    </form>
  );
};