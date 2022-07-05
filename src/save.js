// ------------ IMPORT ZONE ------------
import React, {useState, useRef, useEffect} from 'react';

import './App.css';

import { v4 as uuid } from 'uuid';

// ------------------- APP ALL TOGETHER -------------------

function App() {
return (
<div className="App">
    <Title />
    <TodoForm />
    <TodoList />
</div>
);
}

export default App;

// ------------------- VARIABLES -------------------

const LOCAL_STORAGE_KEY = 'todoApp.todos';

// ----------- FUNCTIONS ----------

  // ----------- TODO CONSTRUCTOR ----------

class todo {
  constructor(text) {
    this.text = text;
    this.key = uuid();
  }
}

  // ----------- ARRAY OF TODO ----------

const todos = [];

  // ----------- ADD TODO IN ARRAY----------

function pushInArray (item) {
  todos.push(item);
}

// ----------- FUNCTIONS BUILDING HTML ----------

function TodoItem (item) {
  return (
    <li className='todoItem'>
      <input className='todoCheckbox' type="checkbox" /> 
      <span className='todoText'>{item.todo.text}</span>
      </li>
  );
}

  // ----------- BUILD TODO LIST ----------

  function TodoList () {
    return (
      <ul className='todoList'>
        {todos.map(item => <TodoItem key={item.key} todo={item} />)}
      </ul>
    );
  }

function ClearBtn () {
  return (
    <button className='clearBtn'>Clear</button>
  );
}

function TodoForm () {
  const [value, setValue] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos)
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [value]);

  function handleSubmit (e) {
    const name = value;
    setTodos(prevTodos => {
      return [...prevTodos, new todo(name)]
    });
  }
  
  return (
  <div className='todoForm'>
    <input className='searchBar' ref={inputRef} placeholder='Add a Todo...' value={value} onChange={e => setValue(e.target.value)} type="text" />
    <div className='btnContainer'>
      <button className='addBtn' onClick={handleSubmit} >Add</button>
      <ClearBtn />
    </div>
  </div>
  );
}


function Title () {
  return (
    <h1 className='title'>My Todo List</h1>
  );
}
