import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import API from "../api";
import authService from "../services/authService";

const IdeaCreatePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = authService.getCurrentUser();
      await API.post("http://localhost:8000/api/ideas", {
        title,
        description,
        created_by: user.id,
      });
      setSuccess(true);
      setTitle("");
      setDescription("");
    } catch (error) {
      setError("Failed to create idea. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2>Create Idea</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <ReactQuill
            theme="snow"
            id="description"
            value={description}
            onChange={setDescription}
            className="form-control"
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && (
          <div className="alert alert-success">Idea created successfully!</div>
        )}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          Create Idea
        </button>
      </form>
    </div>
  );
};

export default IdeaCreatePage;
