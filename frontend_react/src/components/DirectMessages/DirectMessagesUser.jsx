import MessageObjForDisplay from "./MessageObjForDisplay";
const DirectMessagesUser = ({ messages }) => {
  const messageItem = messages.map((message, index) => (
    <MessageObjForDisplay message={message} key={index} />
  ));
  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Messages</th>
        </tr>
      </thead>
      <tbody>{messageItem}</tbody>
    </table>
  );
};

export default DirectMessagesUser;
