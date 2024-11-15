import React, { useState, useEffect } from 'react';
import CreateTodo from './components/CreateTodo';
import List from './components/List';
import "./App.css"
function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:3000/todos");
    const data = await response.json();
    setTodos(data.todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/todo/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to delete todo:', errorData);
            alert('Failed to delete todo.');
        } else {
            alert('Todo deleted successfully!');
            fetchTodos(); // Refresh the list
        }
    } catch (error) {
        console.error('Error during deletion:', error);
        alert('Failed to delete todo.');
    }
};


  return (
    <>
      <CreateTodo fetchTodos={fetchTodos} />
      <List todos={todos} setTodos={setTodos} deleteTodo={deleteTodo} />
    </>
  );
}

export default App;
