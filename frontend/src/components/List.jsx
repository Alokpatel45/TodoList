import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./list.css";

export default function List({ todos, setTodos, deleteTodo }) {
  const toggleCompleted = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="papa">
      {todos.map((todo) => (
        <div className="parent" key={todo._id}>
          <h1>{todo.title}</h1>
          <h2>{todo.description}</h2>
          <button
            className="button"
            onClick={() => toggleCompleted(todo._id)} // Use _id here for consistency
          >
            {todo.completed ? 'Completed' : 'Mark as Complete'}
          </button>
          <button
            onClick={() => deleteTodo(todo._id)} // Consistently use _id here too
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
