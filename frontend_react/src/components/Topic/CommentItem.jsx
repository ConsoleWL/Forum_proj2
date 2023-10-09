import dayjs from "dayjs";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

const CommentItem = ({ comment }) => {
  console.log(comment);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState();
  const [user, token] = useAuth();

  var checkOwnerOfComment = user.id === comment.commentOfUser.id;

  //add like for comment
  const handleCommentLikes = async (e) => {
    try {
      const response = await axios.put(
        `https://localhost:5001/api/comment/likecomment/${comment.commentId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.warn(
        "Error in Topic Page, CommentItem Component, handleCommentLikes Button",
        error
      );
    }
  };

  //delete comment
  const handleDeleteComment = async (e) => {
    try {
      const response = await axios.delete(
        `https://localhost:5001/api/comment/${comment.commentId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.warn("Error in Topic Page , CommentItem, delete Button", error);
    }
  };

  // handle updateupdate
  const handleUpdateUpdate = async (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    setText(comment.text);
  };

  const updatedText = {
    text,
  };

  const handleCommentText = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(
        `https://localhost:5001/api/comment/${comment.commentId}`,
        updatedText,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setIsEditing(!isEditing);
    } catch (error) {
      console.warn(
        "Error in TopicPage , CommentItem, Update Comment Button",
        error
      );
    }
  };

  // format dates
  const shortDateFormat = dayjs(comment.timePosted).format("MM/DD/YYYY");
  return (
    <tr>
      <td>{comment.text}</td>
      <td>{comment.commentOfUser.userName}</td>
      <td>{shortDateFormat}</td>
      <td>{comment.likes}</td>
      <td>
        <button onClick={handleCommentLikes}> {comment.likes}</button>
      </td>
      {checkOwnerOfComment ? (
        <td>
          <button type="button" onClick={handleDeleteComment}>
            Delete
          </button>
        </td>
      ) : null}

      {isEditing ? (
        <td>
          <form onSubmit={handleCommentText}>
            <label>Text</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <button type="submit">Save</button>
          </form>
        </td>
      ) : null}

      <td>
        {checkOwnerOfComment && !isEditing ? (
          <button onClick={handleUpdateUpdate} type="button">
            Update
          </button>
        ) : null}
      </td>
    </tr>
  );
};

export default CommentItem;
