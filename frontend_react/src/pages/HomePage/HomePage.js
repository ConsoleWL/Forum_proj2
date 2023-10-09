import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";

//components
import TopicTable from "../../components/TopicTable/TopicTable";

const HomePage = ({}) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopic();
  }, [topics]);

  // get all topics
  const fetchTopic = async () => {
    try {
      let response = await axios.get(`https://localhost:5001/api/topic`);
      setTopics(response.data);
    } catch (error) {
      console.log("Error in fetchTopics method, HomePage", error);
    }
  };

  return (
    <div>
      <Link to="/topic">
        <button type="button">New Topic</button>
      </Link>
      <TopicTable topics={topics} />
    </div>
  );
};

export default HomePage;

// The "user" value from this Hook contains user information (id, userName, email) from the decoded token
// The "token" value is the JWT token sent from the backend that you will send back in the header of any request requiring authentication
// const [cars, setCars] = useState([]);
// const [user, token] = useAuth();

// useEffect(() => {
//   fetchCars();
// }, [token]);

// const fetchCars = async () => {
//   try {
//     let response = await axios.get("https://localhost:5001/api/cars/myCars", {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     });
//     setCars(response.data);
//   } catch (error) {
//     console.log(error.response.data);
//   }
// };

// {
/* <div className="container">
{console.log(user)}
<h1>Home Page for {user.userName}!</h1>
{cars &&
  cars.map((car) => (
    <p key={car.id}>
      {car.year} {car.model} {car.make}
    </p>
  ))}
</div> */
// }
