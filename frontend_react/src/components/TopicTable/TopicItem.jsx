import dayjs from "dayjs";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const TopicItem = ({ topicObject, isProfilePage }) => {
  const [user, token] = useAuth();

  // time posted
  const shortDateFormat = dayjs(topicObject.timePosted).format("MM/DD/YYYY");
  const shortDateFormatTopic = dayjs(topicObject.editedDate).format(
    "MM/DD/YYYY"
  );
  console.log(isProfilePage);
  // // handle topics likes
  const handleTopicLikes = async (e) => {
    try {
      const response = await axios.put(
        `https://localhost:5001/api/topic/liketopic/${topicObject.topicId}`,
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
    topicObject && (
      <tr>
        <td>{topicObject.topicId}</td>
        <td>
          <Link to={`/topic/${topicObject.topicId}`}>
            <h4>{topicObject.title}</h4>
          </Link>
        </td>

        <td>
          <Link to={`/profile/${topicObject.authorOfTopic.id}`}>
            {!isProfilePage ? (
              <img
                className="icon-image-small"
                src={`data:image/jpeg;base64, ${topicObject.authorOfTopic.profilePictureB64Base}`}
              />
            ) : null}
            {topicObject.authorOfTopic.userName}
          </Link>
        </td>
        <td>{shortDateFormat}</td>

        <td>{topicObject.isEdited ? shortDateFormatTopic : null}</td>
        <td>
          <button
            className="btn btn-primary btn-block mb-4"
            onClick={handleTopicLikes}
          >
            {topicObject.likes}
          </button>
        </td>
      </tr>
    )
  );
};

export default TopicItem;
