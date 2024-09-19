// frontend/src/components/Register.js

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const { register } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'player',
  });

  const { username, password, role } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Username:</label>
          <input name="username" value={username} onChange={onChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select name="role" value={role} onChange={onChange}>
            <option value="player">Player</option>
            <option value="host">Host</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
