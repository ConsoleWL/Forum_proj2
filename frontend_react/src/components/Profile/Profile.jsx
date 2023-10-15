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
  const [imageData, setImageData] = useState();

  console.log(userObj);
  var checkProfileIsAuthorizedUser = user.id === userObj.userObj.id;

  const handleUpdateButton = async (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    setFirstName(userObj.userObj.firstName);
    setLastName(userObj.userObj.lastName);
    setEmail(userObj.userObj.email);
  };

  const updateUser = {
    firstName,
    lastName,
    email,
    file: imageData,
  };

  const formData = new FormData();
  formData.append("file", imageData);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("email", email);

  function handleImageChange(e) {
    setImageData(e.target.files[0]);
    console.log(e.target.files);
  }
  // update profile
  const handleUpdateProfile = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(
        `https://localhost:5001/api/user/`,
        formData,
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
    <div>
      <div>
        <h3>username: {userObj.userObj.userName}</h3>
        <h5>first name: {userObj.userObj.firstName}</h5>
        <h5>lastname: {userObj.userObj.lastName}</h5>
        <h5>email: {userObj.userObj.email}</h5>
        <div>Registered: {shortDateFormat}</div>

        {isEditing ? (
          <div>
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
              <label>Default file input example</label>
              <input type="file" onChange={handleImageChange} />
              <br />
              <div>
                <button type="submit">Save</button>
              </div>
            </form>
            <div></div>
          </div>
        ) : null}

        <div>
          <div>
            {checkProfileIsAuthorizedUser && !isEditing ? (
              <button onClick={handleUpdateButton}>Update</button>
            ) : null}
          </div>
        </div>
      </div>

      <div>
        <img
          src={`data:image/jpeg;base64, ${userObj.userObj.profilePictureB64Base}`}
        />
      </div>
    </div>
  );
};

export default Profile;
