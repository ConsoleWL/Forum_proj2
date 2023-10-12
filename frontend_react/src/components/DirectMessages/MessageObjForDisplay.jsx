import "./MessageObjForDisplay.css";
import dayjs from "dayjs";

const MessageObjForDisplay = ({ message }) => {
  const shortDateFormat = dayjs(message.messageTime).format("MM/DD/YYYY");
  console.log(message);
  return (
    <div className="container3">
      <div>
        <h4 className="person">{message.fromUser.userName}</h4>
      </div>
      <div>
        <p>{message.text}</p>
      </div>
      <span className="time-right">{shortDateFormat}</span>
    </div>
  );
};

export default MessageObjForDisplay;
