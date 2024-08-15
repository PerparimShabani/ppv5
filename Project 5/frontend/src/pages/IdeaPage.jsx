// src/components/IdeaPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import "bootstrap/dist/css/bootstrap.min.css";
import API from "../api";
import authService from "../services/authService";

const IdeaPage = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const fetchIdea = async () => {
    try {
      const response = await API.get(`http://localhost:8000/api/ideas/${id}`);
      setIdea(response.data);
    } catch (error) {
      console.error("Error fetching idea:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await API.get(
        `http://localhost:8000/api/ideas/${id}/comments`
      );
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments: ", error);
    }
  };

  useEffect(() => {
    fetchIdea();
    fetchComments();
  }, [id]);

  const handleUpvote = async () => {
    try {
      await API.post(`http://localhost:8000/api/ideas/${id}/upvote`, {
        upvote: true,
      });
      fetchIdea();
    } catch (error) {
      console.error("Error upvoting idea:", error);
    }
  };

  const handleDownvote = async () => {
    try {
      await API.post(`http://localhost:8000/api/ideas/${id}/downvote`, {
        downvote: true,
      });
      fetchIdea();
    } catch (error) {
      console.error("Error downvoting idea:", error);
    }
  };

  const handleComment = async () => {
    try {
      await API.post(`http://localhost:8000/api/ideas/${id}/comments/create`, {
        text: commentText,
        created_by: authService.getCurrentUser().id,
        idea: id,
      });
      fetchIdea();
      fetchComments();
      setCommentText("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (!idea) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5 border p-4">
      <h1 className="text-center">{idea.title}</h1>
      <p>
        <strong>Created by:</strong> {idea.created_by?.username}
      </p>
      <p>
        <strong>Created at:</strong>{" "}
        {new Date(idea.created_at).toLocaleString()}
      </p>
      <br />
      <div
        className="border p-2"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(idea.description),
        }}
      ></div>

      <div className="mt-4 d-flex gap-3">
        <button className="btn btn-success mr-2" onClick={handleUpvote}>
          {idea.upvotes} &#128077;
        </button>
        <button className="btn btn-danger mr-2" onClick={handleDownvote}>
          {idea.downvotes} &#128078;
        </button>
      </div>

      <h4 className="mt-4">Comments</h4>
      <ul className="list-group">
        {comments?.map((comment) => (
          <li key={comment.id} className="list-group-item">
            {comment.text}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <textarea
          className="form-control"
          placeholder="Add a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <button className="btn btn-primary mt-2" onClick={handleComment}>
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default IdeaPage;
