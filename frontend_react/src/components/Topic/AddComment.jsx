import axios from "axios";
import useAuth from "../../hooks/useAuth";

const AddComment = ({ text, setText, topicId }) => {
  const [user, token] = useAuth();

  const handleAddComent = async (e) => {
    e.preventDefault();

    const formData = {
      text,
      topicId,
    };

    try {
      const response = await axios.post(
        "https://localhost:5001/api/comment",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.warn("Error submitting new comment in TopicPage", error);
    }
  };
  return (
    <form onSubmit={handleAddComent}>
      <div>
        <textarea
          rows="3"
          onChange={(e) => setText(e.target.value)}
          placeholder="comment"
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddComment;
