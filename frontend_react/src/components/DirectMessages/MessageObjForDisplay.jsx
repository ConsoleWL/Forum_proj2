const MessageObjForDisplay = ({ message }) => {
  return (
    <tr>
      <td>
        <button className="btn btn-primary btn-block mb-4">
          {message.fromUser.userName}
        </button>
      </td>
      <td>{message.text}</td>
    </tr>
  );
};

export default MessageObjForDisplay;
