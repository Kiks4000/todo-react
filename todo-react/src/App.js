// ------------ IMPORT ZONE ------------

import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import './App.css';

import TodoList from './TodoList';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

// ------------------- APP ALL TOGETHER -------------------

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }
  , []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }
  , [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuid(), name: name, complete: false}]
    }
    )
    todoNameRef.current.value = null;
  }

  function handleClearTodos(e) {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }
  
  return (
    <>
    <div className="App">
      <h1 className='title'> My Todo List</h1>
    <input className='searchBar' ref={todoNameRef} placeholder='Add a Todo...'type="text" />
    <div className='btnContainer'>
      <button className='addBtn' onClick={handleAddTodo}>Add</button>
      <button className='clearBtn' onClick={handleClearTodos}>Clear</button>
    </div>
    <div className='leftTodo'> You have {todos.filter(todo => !todo.complete).length} things to do left !</div>
    <div className='todoList'><TodoList todos={todos} toggleTodo={toggleTodo} /></div>
    </div>
    </>
  )
}

export default App;

