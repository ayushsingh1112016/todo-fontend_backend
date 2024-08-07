import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard'; // Adjust the path as needed

function Home() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    time: '',
    description: '',
    status: false
  });

  useEffect(() => {
    axios.get("http://localhost:3001/todos") // Adjust the URL as needed
      .then((response) => {
        setTodoList(response.data);
      });
  }, [todoList]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/todos/${id}`)
      .then(() => {
        setTodoList(todoList.filter(task => task.id !== id));
      });
  };

  const handleUpdate = (id, updatedTask) => {
    axios.put(`http://localhost:3001/todos/${id}`, updatedTask)
      .then(() => {
        setTodoList(todoList.map(task => (task.id === id ? updatedTask : task)));
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/todos', newTodo)
      .then((response) => {
        setTodoList([...todoList, response.data]);
        setNewTodo({
          title: '',
          time: '',
          description: '',
          status: false,
        });
      })
      .catch((error) => {
        console.error('There was an error adding the todo!', error);
      });
  };

  return (
    <div className=' flex w-3/5 flex-col justify-center items-center'>
      <h1 className='text-center w-full text-3xl text-gray-800'>Todo List</h1>
      <div className='w-full flex'>
        <div className='w-full flex flex-col'>
          {todoList.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </div>
      <div className='w-full flex justify-start items-center px-50 mt-4'>
        <form onSubmit={handleSubmit} className='w-full flex flex-col'>
          <input
            type='text'
            name='title'
            value={newTodo.title}
            onChange={handleChange}
            placeholder='Title'
            className='text-lg font-medium text-gray-900 border border-gray-300 rounded-md p-2 mb-2'
            required
          />
          <input
            type='datetime-local'
            name='time'
            value={newTodo.time}
            onChange={handleChange}
            className='text-sm text-gray-500 border border-gray-300 rounded-md p-2 mb-2'
            required
          />
          <input
            type='text'
            name='description'
            value={newTodo.description}
            onChange={handleChange}
            placeholder='Description'
            className='text-sm text-gray-500 border border-gray-300 rounded-md p-2 mb-2'
            required
          />
          <button type='submit' className='bg-blue-500 text-white rounded-md p-2'>
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
