import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//components
import Profile from "../../components/Profile/Profile";
import TopicTable from "../../components/TopicTable/TopicTable";
import CommentsTable from "../../components/Topic/CommentsTable";

const ProfilePage = () => {
  const [user, token] = useAuth();
  const { id } = useParams();
  const [userObj, setUserObj] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  // console.log(userObj);
  // console.log(userObj.topics);

  //get user information
  const fetchUser = async () => {
    try {
      let response = await axios.get(`https://localhost:5001/api/user/${id}`);
      setUserObj(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error in fetchUser by Id, Profile Page", error);
    }
  };

  return (
    <div>
      <Profile userObj={userObj} />
      <TopicTable topics={userObj.topics} />
      {/* <CommentsTable /> */}
    </div>
  );
};

export default ProfilePage;
