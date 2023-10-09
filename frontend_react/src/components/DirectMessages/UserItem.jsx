const UserItem = ({ userObj, activeIndex, setActiveIndex, index }) => {
  const handleActive = () => {
    setActiveIndex(index);
    console.log(`You clicked ${userObj.userName}`);
  };
  return (
    <tr>
      <td onClick={handleActive}>{userObj.userName}</td>
    </tr>
  );
};

export default UserItem;
