import dayjs from "dayjs";

const Profile = (userObj) => {
  const shortDateFormat = dayjs(userObj.userObj.registrationDate).format(
    "MM/DD/YYYY"
  );

  return (
    <div>
      <div>User: {userObj.userObj.userName}</div>
      <div>Registered: {shortDateFormat}</div>
    </div>
  );
};

export default Profile;
