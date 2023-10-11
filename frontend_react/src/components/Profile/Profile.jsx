import dayjs from "dayjs";

const Profile = (userObj) => {
  const shortDateFormat = dayjs(userObj.userObj.registrationDate).format(
    "MM/DD/YYYY"
  );
  console.log(userObj);

  return (
    <div className="profile">
      <h3>username: {userObj.userObj.userName}</h3>
      <h5>first name: {userObj.userObj.firstName}</h5>
      <h5>lastname: {userObj.userObj.lastName}</h5>
      <h5>email: {userObj.userObj.email}</h5>
      <div>Registered: {shortDateFormat}</div>
    </div>
  );
};

export default Profile;
