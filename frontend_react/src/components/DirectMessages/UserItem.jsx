const UserItem = ({ userObj, activeIndex, setActiveIndex, index }) => {
  const handleActive = () => {
    setActiveIndex(index);
  };
  return (
    <tr>
      <td onClick={handleActive}>{userObj.userName}</td>
    </tr>
  );
};

export default UserItem;
