import "./MessageObjForDisplay.css";

const UserItem = ({ userObj, activeIndex, setActiveIndex, index }) => {
  const handleActive = () => {
    setActiveIndex(index);
  };
  return (
    <div className="container4">
      <div onClick={handleActive}>
        <h4 className="person">{userObj.userName}</h4>
      </div>
    </div>
  );
};

export default UserItem;
