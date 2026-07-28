import React from "react";
import type { ITodo } from "../types/todo";

interface TodoItemProps {
  todo: ITodo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      
      <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
        [{todo.priority.toUpperCase()}] {todo.title}
      </span>

      <button onClick={() => onDelete(todo.id)}>Удалить</button>
    </div>
  );
};