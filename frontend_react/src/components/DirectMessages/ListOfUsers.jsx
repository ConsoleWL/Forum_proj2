import UserItem from "./UserItem";
const ListOfUsers = ({ users = [], activeIndex, setActiveIndex }) => {
  const userItem = users.map((user, index) => (
    <UserItem
      userObj={user}
      key={user.id}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      index={index}
    />
  ));
  return (
    <table>
      <thead>
        <tr>
          <th>Users:</th>
        </tr>
      </thead>
      <tbody>{userItem}</tbody>
    </table>
  );
};

export default ListOfUsers;
