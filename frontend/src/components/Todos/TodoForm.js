import React, { useState } from 'react';
import todoService from '../../services/todoService';

const TodoForm = ({ onTodoAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      const newTodo = await todoService.createTodo({
        title: formData.title,
        description: formData.description
      });
      
      onTodoAdded(newTodo);
      setFormData({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div className="todo-form-container">
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-row">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="What's the task title?"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="What's the task description?"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-add">Add</button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
