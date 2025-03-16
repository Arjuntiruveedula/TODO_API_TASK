import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({
    user_fname: '',
    user_lname: '',
    user_id: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = formData;
      
      await authService.register(registerData);
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register for Todo App</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="user_fname"
              value={formData.user_fname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="user_lname"
              value={formData.user_lname}
              onChange={handleChange}
              required
            />
          </div>
         
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;