// src/components/Login.js
import React, { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(username, password);
      navigate("/");
    } catch (error) {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <form
        onSubmit={handleLogin}
        className="border p-4 w-75 mx-auto mt-5 rounded"
      >
        <h2 className="text-center">Log in to continue</h2>
        {message && <div className="alert alert-danger mt-3">{message}</div>}
        <div className="form-group mt-4">
          <label>Username:</label>
          <input
            type="text"
            className="form-control mt-1 p-2"
            value={username}
            placeholder="johndoe"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group mt-4">
          <label>Password:</label>
          <input
            type="password"
            className="form-control mt-1 p-2"
            value={password}
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4 w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
