import React, { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import todoService from '../../services/todoService';

const TodoItem = ({ todo, onTodoUpdate, onTodoDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleStatusToggle = async () => {
    try {
      const updatedTodo = await todoService.updateTodo(todo._id, {
        ...todo,
        completed: !todo.completed
      });
      onTodoUpdate(updatedTodo);
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await todoService.deleteTodo(todo._id);
      onTodoDelete(todo._id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedTodo = await todoService.updateTodo(todo._id, {
        ...todo,
        title: editedTitle
      });
      onTodoUpdate(updatedTodo);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleSave}
            autoFocus
          />
        ) : (
          <>
            <h3 className={todo.completed ? 'completed-text' : ''}>{todo.title}</h3>
            {todo.description && <p className="todo-description">{todo.description}</p>}
          </>
        )}
      </div>
      <div className="todo-actions">
        
        <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDelete()}
                        title="Delete?"
                      />
                      <BsCheckLg
                        className="icon"
                        onClick={() => handleStatusToggle()}
                        title="Complete?"
                      />
                      <AiOutlineEdit
                        className="icon"
                        onClick={() => handleEdit()}
                        title="Edit?"
                      />
        
      </div>
    </div>
  );
};

export default TodoItem;