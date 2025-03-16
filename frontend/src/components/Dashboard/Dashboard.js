import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import TodoList from '../Todos/TodoList';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>TO-DO-LIST</h1>
        <div className="user-info">
          <span>Welcome, {user?.user_fname}</span>
          <button onClick={logout} className="btn btn-logout">Logout</button>
        </div>
      </header>
      <main>
        <TodoList />
      </main>
    </div>
  );
};

export default Dashboard;