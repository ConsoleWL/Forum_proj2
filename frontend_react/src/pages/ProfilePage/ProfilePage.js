import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//components
import Profile from "../../components/Profile/Profile";
import TopicTable from "../../components/TopicTable/TopicTable";
import CommentsTable from "../../components/Topic/CommentsTable";
import SendMessage from "../../components/Profile/SendMessage";

const ProfilePage = () => {
  const { id } = useParams();
  const [userObj, setUserObj] = useState({});

  useEffect(() => {
    fetchUser();
  }, [userObj]);

  //get user information
  const fetchUser = async () => {
    try {
      let response = await axios.get(`https://localhost:5001/api/user/${id}`);
      setUserObj(response.data);
    } catch (error) {
      console.log("Error in fetchUser by Id, Profile Page", error);
    }
  };

  return (
    <div>
      <Profile userObj={userObj} />
      <SendMessage userObj={userObj} />
      <TopicTable topics={userObj.topics} />
      <CommentsTable topicReviews={userObj.comments} />
    </div>
  );
};

export default ProfilePage;
