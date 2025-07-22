import React, { useState } from 'react';
import './RegisterForm.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('pistol');
  const [confirmPassword, setConfirmPassword] = useState('pistol');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
 try {
  console.log('Sending request to Reqres:', { email, password });

  const response = await axios.post(
    'https://reqres.in/api/register',
    { email, password },
    {
      headers: {
        'x-api-key': 'reqres-free-v1',
      },
    }
  );

  console.log('Response:', response.data);
  const { token } = response.data;
  localStorage.setItem('token', token);
  localStorage.setItem('email', email);
  navigate('/home');
} catch (err) {
  console.error('Error response:', err.response);
  setError(err.response?.data?.error || 'Registration failed');
}
     finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="title">Register</p>
      <p className="message">Signup now and get full access to our app.</p>

      <div className="flex">
        <label>
          <input
            required
            type="text"
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <span>First Name</span>
        </label>
        <label>
          <input
            required
            type="text"
            className="input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <span>Last Name</span>
        </label>
      </div>

      <label>
        <input
          required
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>Email</span>
      </label>

      <label>
        <input
          required
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span>Password</span>
      </label>

      <label>
        <input
          required
          type="password"
          className="input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span>Confirm password</span>
      </label>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button className="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Submit'}
      </button>

      <p className="signin">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
