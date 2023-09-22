import { useSockets } from "../store";
import Message from "./Message";
import {  useEffect, useRef } from "react";

const ChatBox = ({screen,dashbordMSG}) => {
  const { state } = useSockets();
  const { room } = state;
  const {messages,roomId}=room

  const messagesEndRef = useRef();


  
  const scrollToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  };
  
  useEffect(scrollToBottom, [messages])
  
  
  if (!roomId) {
    return <div />;
}




  
 

  return (
    <div ref={messagesEndRef} className={` pt-20  w-full h-[90vh]  scroll-m-2 overflow-y-scroll flex-grow  contanerWrap  `} >
      {messages.map((msg,index) => (
        
        <Message dashbordMSG={dashbordMSG} key={index} id={index} message= {msg} />
      ))}
      <div ></div>
    </div>
  );
};

export default ChatBox;