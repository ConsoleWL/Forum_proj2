import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const Topic = ({ topicItem }) => {
  const [user, token] = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState();
  const [title, setTitle] = useState();
  const navigate = useNavigate();

  var checkProfileIsAuthorizedUser = user.id === topicItem.authorOfTopic.id;

  const handleUpdateButton = async (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    setText(topicItem.text);
    setTitle(topicItem.title);
  };

  const updatedTopic = {
    title,
    text,
  };

  // update topic
  const handleUpdateTopic = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(
        `https://localhost:5001/api/topic/${topicItem.topicId}`,
        updatedTopic,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setIsEditing(!isEditing);
    } catch (error) {
      console.warn("Error in Topic Page , Update Button", error);
    }
  };

  // delete topic
  const handleDeleteTopic = async (e) => {
    try {
      const response = await axios.delete(
        `https://localhost:5001/api/topic/${topicItem.topicId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.warn("Error in Home Page , Topic Item, Delete Button", error);
    }
  };

  //date format
  const shortDateFormat = dayjs(topicItem.timePosted).format("MM/DD/YYYY");

  return (
    <div>
      <div className="profile">
        <h3>Author: {topicItem.authorOfTopic.userName}</h3>
        <div>PublishedDate: {shortDateFormat}</div>
        <div>Likes: {topicItem.likes}</div>
      </div>

      {isEditing ? (
        <div className="profile">
          <form onSubmit={handleUpdateTopic}>
            <label>Title</label>
            <br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <br />
            <br />
            <label>Text</label>
            <br />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="5"
              cols="70"
            ></textarea>
            <br />
            <div>
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Save
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="profile">
          <h3>{topicItem.title}</h3>
          <p>Text: {topicItem.text}</p>
        </div>
      )}

      <div class="d-flex justify-content-start profile">
        <div className="update-delete">
          {checkProfileIsAuthorizedUser && !isEditing ? (
            <button
              onClick={handleUpdateButton}
              className="btn btn-primary btn-block mb-4"
            >
              Update
            </button>
          ) : null}
        </div>

        <div className="update-delete">
          {checkProfileIsAuthorizedUser ? (
            <button
              onClick={handleDeleteTopic}
              className="btn btn-primary btn-block mb-4"
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Topic;
