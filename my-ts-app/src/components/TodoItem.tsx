import React from "react";
import type { ITodo } from "../types/todo";

interface TodoItemProps {
  todo: ITodo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  // Выбираем название класса для бейджа приоритета
  const priorityClass = `priority-badge priority-${todo.priority}`;
  
  const priorityLabels = {
    low: "Низкий",
    medium: "Средний",
    high: "Срочно"
  };

  return (
    <div className="todo-card">
      <div className="todo-header">
        <div className="todo-left">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span className={`todo-title ${todo.completed ? "completed" : ""}`}>
            {todo.title}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className={priorityClass}>
            {priorityLabels[todo.priority]}
          </span>
          <button className="btn-delete" onClick={() => onDelete(todo.id)}>
            ✕
          </button>
        </div>
      </div>

      {/* Отображаем заметку, если она была передана */}
      {todo.description && (
        <div className="todo-description">
          {todo.description}
        </div>
      )}
    </div>
  );
};