const MessageObjForDisplay = ({ message }) => {
  return (
    <tr>
      <td>{message.fromUser.userName}</td>
      <td>{message.text}</td>
    </tr>
  );
};

export default MessageObjForDisplay;
