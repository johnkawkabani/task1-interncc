import { loginUser } from "../services/api";
import React, { useState } from "react";
import "./LoginForm.css";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [logemail, setLogemail] = useState("eve.holt@reqres.in"); 
  const [logpass, setLogpass] = useState("cityslicka");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(logemail, logpass); 
      const token = response.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("email", logemail);
      navigate("/home");
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="card">
      <h4 className="title">Log In!</h4>
      <form onSubmit={handleLogin}>
        <div className="field">
          <svg
            className="input-icon"
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1..." />
          </svg>
          <input
            autoComplete="off"
            id="logemail"
            placeholder="Email"
            className="input-field"
            name="logemail"
            type="email"
            value={logemail}
            onChange={(e) => setLogemail(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <svg
            className="input-icon"
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M80 192V144C80 64.47 144.5 0 224 0..." />
          </svg>
          <input
            autoComplete="off"
            id="logpass"
            placeholder="Password"
            className="input-field"
            name="logpass"
            type="password"
            value={logpass}
            onChange={(e) => setLogpass(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
