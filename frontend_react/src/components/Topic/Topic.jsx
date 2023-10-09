import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Topic = ({ topicItem }) => {
  const [user, token] = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState();
  const [title, setTitle] = useState();

  var checkProdileIsAuthorizedUser = user.id === topicItem.authorOfTopic.id;

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

  //date format
  const shortDateFormat = dayjs(topicItem.timePosted).format("MM/DD/YYYY");

  return (
    <div>
      <div>
        <div>Author: {topicItem.authorOfTopic.userName}</div>
        <div>PublishedDate: {shortDateFormat}</div>
        <div>Likes: {topicItem.likes}</div>
      </div>

      {isEditing ? (
        <div>
          <form onSubmit={handleUpdateTopic}>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <br />
            <br />
            <label>Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>

            <button type="submit">Save</button>
          </form>
        </div>
      ) : (
        <div>
          <div>{topicItem.title}</div>
          <div>Text: {topicItem.text}</div>
        </div>
      )}

      <div>
        {checkProdileIsAuthorizedUser && !isEditing ? (
          <button onClick={handleUpdateButton}>Update</button>
        ) : null}
      </div>
    </div>
  );
};

export default Topic;
