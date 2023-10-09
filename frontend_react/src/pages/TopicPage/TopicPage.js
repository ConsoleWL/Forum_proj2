import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

//components
import Topic from "../../components/Topic/Topic";
import CommentsTable from "../../components/Topic/CommentsTable";

const TopicPage = () => {
  const [user, token] = useAuth();
  const { topicId } = useParams();
  const [topicItem, setTopicItem] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchTopic();
  }, [topicItem]);

  const fetchTopic = async () => {
    try {
      let response = await axios.get(
        `https://localhost:5001/api/topic/${topicId}`
      );
      setTopicItem(response.data);
    } catch (error) {
      console.log("Error in fetchTopic by id, in TopicPage profile ", error);
    }
  };

  return (
    <div>
      {topicItem && <Topic topicItem={topicItem} />}
      {topicItem && <CommentsTable topicReviews={topicItem.comments} />}
    </div>
  );
};

export default TopicPage;
