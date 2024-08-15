// IdeaEditComponent.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import API from "../api";
import RichTextEditor from "../components/RichTextEditor";
import { toast } from "react-toastify";

const IdeaEditPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate;

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const response = await API.get(
          `http://localhost:8000/api/ideas/${id}/edit`
        );
        setFormData({
          title: response.data.title,
          description: response.data.description,
        });
      } catch (error) {
        console.error("Error fetching idea:", error);
      }
    };

    fetchIdea();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`http://localhost:8000/api/ideas/${id}/edit`, formData);
      toast.success("successfully updated");
    } catch (error) {
      console.error("Error updating idea:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Idea</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          {/* <textarea
            className="form-control"
            id="description"
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
          /> */}
          <RichTextEditor
            value={formData.description}
            onChange={(val) => setFormData({ ...formData, description: val })}
            name="description"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Idea
        </button>
      </form>
    </div>
  );
};

export default IdeaEditPage;
