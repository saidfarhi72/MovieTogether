import React from "react";

const Message = ({ message ,id,dashbordMSG}) => {
    console.log(message)

  const handleClick = (event) => {


    // Do something with the ID
  };




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