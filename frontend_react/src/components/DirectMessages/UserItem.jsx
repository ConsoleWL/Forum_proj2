import { Link } from "react-router-dom";

const UserItem = ({ userObj, activeIndex, setActiveIndex, index }) => {
  const handleActive = () => {
    setActiveIndex(index);
  };
  return (
    <tr>
      <td onClick={handleActive}>
        <button className="btn btn-primary btn-block mb-4">
          {userObj.userName}
        </button>
      </td>
    </tr>
  );
};

export default UserItem;
