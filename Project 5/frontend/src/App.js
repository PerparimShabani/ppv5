import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

// components
import NavBar from "./components/NavBar.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";

// pages
import HomePage from "./pages/home.jsx";
import IdeaPage from "./pages/IdeaPage.jsx";
import IdeaCreatePage from "./pages/IdeaCreate.jsx";
import Profile from "./pages/Profile.jsx";
import IdeaEditPage from "./pages/IdeaEdit.jsx";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mt-3">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/idea/create" element={<IdeaCreatePage />} />
          <Route path="/idea/:id" element={<IdeaPage />} />
          <Route path="/idea/:id/edit" element={<IdeaEditPage />} />
          <Route exact path="/" element={<HomePage />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
