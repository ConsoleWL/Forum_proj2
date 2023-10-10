import MessageObjForDisplay from "./MessageObjForDisplay";
const DirectMessagesUser = ({ messages }) => {
  const messageItem = messages.map((message, index) => (
    <MessageObjForDisplay message={message} key={index} />
  ));
  return (
    <table>
      <thead>
        <tr>
          <h3>User</h3>
          <th>Messages</th>
        </tr>
      </thead>
      <tbody>{messageItem}</tbody>
    </table>
  );
};

export default DirectMessagesUser;
