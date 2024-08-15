// src/components/Register.js
import React, { useState } from "react";
import authService from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await authService.register(username, email, password);
      toast.success("Registration successful! Please log in.");
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <form
        onSubmit={handleRegister}
        className="border p-4 w-75 mx-auto mt-5 rounded"
      >
        <h2 className="text-center">Welcome To IdeaSharing Hub</h2>
        {message && <div className="alert alert-info mt-3">{message}</div>}
        <div className="form-group mt-4">
          <label>Username:</label>
          <input
            type="text"
            className="form-control mt-1 p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johndoe"
            required
          />
        </div>
        <div className="form-group mt-4">
          <label>Email:</label>
          <input
            type="email"
            className="form-control mt-1 p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            required
          />
        </div>
        <div className="form-group mt-4">
          <label>Password:</label>
          <input
            type="password"
            className="form-control mt-1 p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-4">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
