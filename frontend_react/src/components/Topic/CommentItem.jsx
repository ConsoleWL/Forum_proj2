import dayjs from "dayjs";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

const CommentItem = ({ comment, isProfilePage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState();
  const [user, token] = useAuth();

  var checkOwnerOfComment = user.id === comment.commentOfUser.id;

  const shortDateFormatComment = dayjs(comment.editedDate).format("MM/DD/YYYY");

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

  console.log(comment);
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
    <tr className="comment-section">
      <td>
        <p>{comment.text}</p>
      </td>

      <td>
        <Link to={`/profile/${comment.commentOfUser.id}`}>
          {!isProfilePage ? (
            <img
              className="icon-image-small"
              src={`data:image/jpeg;base64, ${comment.commentOfUser.profilePictureB64Base}`}
            />
          ) : null}
          <p>{comment.commentOfUser.userName}</p>
        </Link>
      </td>
      <td>{shortDateFormat}</td>
      <td>{comment.isEdited ? shortDateFormatComment : null}</td>
      <td>{comment.likes}</td>
      <td>
        <button
          onClick={handleCommentLikes}
          className="btn btn-primary btn-block mb-4"
        >
          {" "}
          {comment.likes}{" "}
        </button>
      </td>
      {checkOwnerOfComment ? (
        <td>
          <button
            type="button"
            onClick={handleDeleteComment}
            className="btn btn-primary btn-block mb-4"
          >
            Delete
          </button>
        </td>
      ) : null}

      {isEditing ? (
        <td>
          <form onSubmit={handleCommentText} className="commentform">
            <label>Text</label>

            <textarea
              className="texttextarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-block mb-4">
              Save
            </button>
          </form>
        </td>
      ) : null}

      <td>
        {checkOwnerOfComment && !isEditing ? (
          <button
            onClick={handleUpdateUpdate}
            type="button"
            className="btn btn-primary btn-block mb-4"
          >
            Update
          </button>
        ) : null}
      </td>
    </tr>
  );
};

export default CommentItem;
