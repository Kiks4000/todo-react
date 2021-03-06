import React from 'react'

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }
    return (
        <div>
            <label className='todoItem'>
                <input type="checkbox" className='todoCheckbox' checked={todo.complete} onChange={handleTodoClick} />
                { todo.name }
            </label>
        </div>
    )
}
