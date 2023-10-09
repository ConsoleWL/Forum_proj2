import dayjs from "dayjs";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const TopicItem = ({ topic }) => {
  const [user, token] = useAuth();

  // time posted
  const shortDateFormat = dayjs(topic.timePosted).format("MM/DD/YYYY");

  // handle topics likes
  const handleTopicLikes = async (e) => {
    try {
      const response = await axios.put(
        `https://localhost:5001/api/topic/liketopic/${topic.topicId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.warn("Error in Home Page , Topic Item, Like Button", error);
    }
  };

  return (
    <tr>
      <td>{topic.topicId}</td>
      <td>{topic.title}</td>
      <td>{topic.authorOfTopic.userName}</td>
      <td>{shortDateFormat}</td>
      <td>
        <button onClick={handleTopicLikes}>{topic.likes}</button>
      </td>
    </tr>
  );
};

export default TopicItem;
