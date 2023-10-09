import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";

const SendMessage = ({ userObj }) => {
  const [user, token] = useAuth();
  const [messageBox, setMessageBox] = useState(false);
  const [messageText, setMessageText] = useState("");

  // send a message
  var checkProfileIsOurs = user.id !== userObj.id;

  const handleSendMessageButton = async (e) => {
    e.preventDefault();
    setMessageBox(!messageBox);
  };

  const messageData = {
    text: messageText,
    touserid: userObj.id,
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://localhost:5001/api/directmessage`,
        messageData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setMessageBox(!messageBox);
    } catch (error) {
      console.warn(
        "Error in handleSendMessage function, in Profile Page",
        error
      );
    }
  };

  return (
    <div>
      {checkProfileIsOurs ? (
        <button onClick={handleSendMessageButton} type="button">
          Send
        </button>
      ) : null}

      {messageBox ? (
        <div>
          <form onSubmit={handleSendMessage}>
            <label>Text</label>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            ></textarea>
            <button type="submit">SendMessage</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default SendMessage;
