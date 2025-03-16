import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import todoService from '../../services/todoService';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Todo');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await todoService.getTodos();
        setTodos(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleTodoAdded = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleTodoUpdate = (updatedTodo) => {
    setTodos(todos.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo));
  };

  const handleTodoDelete = (todoId) => {
    setTodos(todos.filter(todo => todo._id !== todoId));
  };

  // Filter todos based on active filter
  const filteredTodos = todos.filter(todo => {
    if (activeFilter === 'Todo') return !todo.completed;
    if (activeFilter === 'Completed') return todo.completed;
    return true;
  });

  return (
    <div className="todo-list-container">
      <TodoForm onTodoAdded={handleTodoAdded} />
      
      <div className="todo-filters">
        <button
          className={`filter-btn ${activeFilter === 'Todo' ? 'active' : ''}`}
          onClick={() => setActiveFilter('Todo')}
        >
          Todo
        </button>
        <button
          className={`filter-btn ${activeFilter === 'Completed' ? 'active' : ''}`}
          onClick={() => setActiveFilter('Completed')}
        >
          Completed
        </button>
      </div>

      <div className="todos-container">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : filteredTodos.length === 0 ? (
          <div className="no-todos">No tasks found.</div>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onTodoUpdate={handleTodoUpdate}
              onTodoDelete={handleTodoDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;