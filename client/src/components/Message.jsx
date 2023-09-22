import React from "react";
import { useSockets } from "../store";

const Message = ({ message ,id,dashbordMSG}) => {
    console.log(message)
    const { state, dispatch } = useSockets();
    const { room } = state;
    const {roomId}=room


  
  if (!roomId) {
    return <div />;
  }




  return (
    <div  >
      <div className={`chat ${message.username ===  "You" ? "chat-end" : "chat-start"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
          </div>
        </div>
        <div className="chat-header">
        </div>
        <div className="chat-bubble ">
        { 
          message.message
          
        }
      </div>
       
      </div>
    </div>
  );
};

export default Message;