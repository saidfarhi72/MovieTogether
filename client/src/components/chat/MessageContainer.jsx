import { useEffect, useRef } from "react";
import styles from "./stream.module.css";
import { useSockets } from "../../store";
import EVENTS from "../../config/events";

function MessagesContainer() {
  const { state, dispatch } = useSockets();
  const { room } = state;
  const {socket,roomId,messages,username}=room
  const newMessageRef = useRef(null);
  const messageEndRef = useRef(null);
  console.log("messagesssssssssssssssssssss",messages)

  function handleSendMessage() {
    const message = newMessageRef.current.value;

    if (!String(message).trim()) {
      return;
    }

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });

    const date = new Date();
    
    dispatch({type:EVENTS.SERVER.ROOM_MESSAGE,payload:{
      username: "You",
      message,
      time: `${date.getHours()}:${date.getMinutes()}`,
    }})

    

    newMessageRef.current.value = "";
  }
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  
 

  if (!roomId) {
    return <div />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.messageList}>
        {messages.map(({ message, username, time }, index) => {
          return (
            <div key={index} className={styles.message}>
              <div key={index} className={styles.messageInner}>
                <span className={styles.messageSender}>
                  {username} - {time}
                </span>
                <span className={styles.messageBody}>{message}</span>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>
      <div className={styles.messageBox}>
        <textarea
          rows={1}
          placeholder="Tell us what you are thinking"
          ref={newMessageRef}
        />
        <button onClick={handleSendMessage}>SEND</button>
      </div>
    </div>
  );
}

export default MessagesContainer;
