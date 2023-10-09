import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const CreateTopic = ({}) => {
  const [user, token] = useAuth();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  // submit new Topic request
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      text,
    };

    try {
      const response = await axios.post(
        "https://localhost:5001/api/topic",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.warn(
        "Error submitting new a new topic, in CreateTopic page",
        error
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="addform">
      <div className="form-outline mb-4">
        <label>Topic</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-outline mb-4">
        <label>Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-control"
          rows="4"
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block mb-4">
        Create
      </button>
    </form>
  );
};

export default CreateTopic;
