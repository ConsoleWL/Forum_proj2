import MessageObjForDisplay from "./MessageObjForDisplay";
const DirectMessagesUser = ({ messages }) => {
  const messageItem = messages.map((message, index) => (
    <MessageObjForDisplay message={message} key={index} />
  ));
  return <div>{messageItem}</div>;
};

export default DirectMessagesUser;
