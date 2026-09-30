import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from '../redux/todoSlice';

function Todo() {

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");

  const dispatch = useDispatch();

  const todos = useSelector(data => data.todos.todos);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addTodo({title, status})
    );
    setTitle("");
    setStatus("Pending")
  }

  return (
    <div>
      <h3>Todo App</h3>
      {/* form */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Title' value={title} 
        onChange={(e) => setTitle(e.target.value)} />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type='submit'>Add Todo</button>
      </form>

      {
        todos.map(data => (
          <div key={data.id}>
            <h4>{data.title}</h4>
            <p>{data.status}</p>
          </div>
        ))
      }
    </div>
  )
}

export default Todo