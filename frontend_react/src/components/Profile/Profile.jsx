import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Profile = (userObj) => {
  const shortDateFormat = dayjs(userObj.userObj.registrationDate).format(
    "MM/DD/YYYY"
  );
  const [user, token] = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();

  var checkProfileIsAuthorizedUser = user.id === userObj.userObj.id;

  const handleUpdateButton = async (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    setFirstName(userObj.userObj.firtName);
    setLastName(userObj.userObj.lastName);
    setEmail(userObj.userObj.email);
  };

  const updateUser = {
    firstName,
    lastName,
    email,
  };
  // update profile
  const handleUpdateProfile = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(
        `https://localhost:5001/api/user/`,
        updateUser,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setIsEditing(!isEditing);
    } catch (error) {
      console.warn("Error in handleUpdateProfile method, ProfilePage", error);
    }
  };

  return (
    <div className="profile">
      <h3>username: {userObj.userObj.userName}</h3>
      <h5>first name: {userObj.userObj.firstName}</h5>
      <h5>lastname: {userObj.userObj.lastName}</h5>
      <h5>email: {userObj.userObj.email}</h5>
      <div>Registered: {shortDateFormat}</div>

      {isEditing ? (
        <div className="profile">
          <form onSubmit={handleUpdateProfile}>
            <label>FirtName</label>
            <br />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <br />
            <label>Lastname</label>
            <br />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
            <br />
            <label>Email</label>
            <br />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <br />
            <div>
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Save
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <div className="d-flex justify-content-start profile">
        <div className="update-delete">
          {checkProfileIsAuthorizedUser && !isEditing ? (
            <button
              onClick={handleUpdateButton}
              className="btn btn-primary btn-block mb-4"
            >
              Update
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
