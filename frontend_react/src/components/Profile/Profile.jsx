import dayjs from "dayjs";

const Profile = (userObj) => {
  const shortDateFormat = dayjs(userObj.userObj.registrationDate).format(
    "MM/DD/YYYY"
  );

  return (
    <div className="profile">
      <h3>{userObj.userObj.userName}</h3>
      <div>Registered: {shortDateFormat}</div>
    </div>
  );
};

export default Profile;
