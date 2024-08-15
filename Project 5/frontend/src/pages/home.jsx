// src/components/HomePage.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import API from "../api";
import authService from "../services/authService";

const HomePage = () => {
  const [ideas, setIdeas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    else {
      const fetchIdeas = async () => {
        try {
          const response = await API.get("http://localhost:8000/api/ideas");
          console.log(response);
          setIdeas(response.data);
        } catch (error) {
          console.error("Error fetching ideas:", error);
        }
      };

      fetchIdeas();
    }
  }, [navigate]);

  if (!user) {
    navigate("/login");
  }
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filterAndSortIdeas = () => {
    let filteredIdeas = ideas.filter(
      (idea) =>
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.created_by?.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

    if (sortOrder === "newest") {
      filteredIdeas.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else {
      filteredIdeas.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    }

    return filteredIdeas;
  };

  const filteredIdeas = filterAndSortIdeas();

  return (
    <div className="container mt-5">
      <h2 className="text-center my-5">
        Welcome to IdeaSharing, a community for big brainers like you
      </h2>
      <div className="row mb-4">
        <div className="col-md-9">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title or username"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <div className="row">
        {filteredIdeas.map((idea) => (
          <div key={idea.id} className="col-md-12">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{idea.title}</h5>
                <div className="d-flex gap-2">
                  <small className="">By {idea.created_by?.username}</small>
                  <small>{new Date(idea.created_at).toLocaleString()}</small>
                </div>
                <p
                  className="card-text mt-4 text-truncate"
                  style={{ maxHeight: "100px" }}
                  dangerouslySetInnerHTML={{ __html: idea.description }}
                ></p>
                <Link to={`/idea/${idea.id}`} className="btn btn-primary">
                  View Idea
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
