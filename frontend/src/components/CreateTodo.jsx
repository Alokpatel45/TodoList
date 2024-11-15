import React, { useState } from 'react';
import './tod.css'
function CreateTodo() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleAddTodo = () => {
    if(title==''||desc==""){
      alert("empty title or description");
      return;
    }
    fetch('http://localhost:3000/todo', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        description: desc,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const json = await res.json();
          alert('Todo added successfully');
          // Optionally clear the input fields after successful addition
          setTitle('');
          setDesc('');
        } else {
          alert('Failed to add todo');
        }
      })
      .catch((err) => {
        console.error('Error adding todo:', err);
        alert('Error adding todo');
      });
  };

  return (
    <div>
      <input
        id="title"
        type="text"
        placeholder="Title"
        value={title}
        style={{ padding: 10, margin: 10 }}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        id="desc"
        type="text"
        placeholder="Description"
        value={desc}
        style={{ padding: 10, margin: 10 }}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button
        style={{ padding: 10, margin: 10 }}
        onClick={handleAddTodo}
        className='button'
      >
        Add a Todo
      </button>
     
    </div>
  );
}

export default CreateTodo;
