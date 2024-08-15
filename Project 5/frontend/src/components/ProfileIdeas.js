import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import DOMPurify from "dompurify";

const ProfileIdeas = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await API.get(
          "http://localhost:8000/api/profile/ideas"
        );
        setIdeas(response.data);
      } catch (error) {
        console.error("Error fetching profile ideas:", error);
      }
    };

    fetchIdeas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`http://localhost:8000/api/ideas/${id}/delete`);
      setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea.id !== id));
    } catch (error) {
      console.error("Error deleting idea:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">My Ideas</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {ideas.map((idea) => (
          <div key={idea.id} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{idea.title}</h5>
                <p
                  className="card-text"
                  style={{ height: "100px", overflow: "hidden" }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(idea.description),
                  }}
                ></p>
              </div>
              <div className="card-footer">
                <Link
                  to={`/idea/${idea.id}/edit`}
                  className="btn btn-primary me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(idea.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileIdeas;
