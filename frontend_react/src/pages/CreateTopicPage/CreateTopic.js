import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTopic = ({ user, token }) => {
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Topic</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Text</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateTopic;
