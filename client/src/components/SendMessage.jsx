import React, {useState } from 'react'

import { useSockets } from '../store';
import EVENTS from '../config/events';

function SendMessage() {
    const { state, dispatch } = useSockets();
    const { room } = state;
    const {socket,roomId,messages,username}=room
  
  const [message, setNessage] = useState("");
  const [hight, setHight] = useState(49);


  const handTextarea = (e) => {
    e.preventDefault();
    const newValue = e.target.value;
    setNessage(newValue); // Update the value state with the new value
  
    const newHeight = Math.min( newValue.split('\n').length * 49,5*49)
    setHight(newHeight); // Update the hight state with the new calculated height
  };
  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  }
  
  
  const handleSendMessage = async (e) => {

    console.log(roomId,message,username)

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });

    const date = new Date();
    
    dispatch({type:EVENTS.SERVER.ROOM_MESSAGE,payload:{
      username: "You",
      message,
      time: `${date.getHours()}:${date.getMinutes()}`,
    }})
    setNessage('')

    
    
  }

  return (
    <div  className={`  ${" fixed bottom-0 w-[30%]  py-10 shadow-lg" }`} >
      <form onSubmit={handleSendMessage} className="px-2 containerWrap flex">
      <textarea value={message} rows={message.split('\n').length}   wrap="soft"  onKeyDown={handleKeyDown} onChange={handTextarea} style={{ height: hight,resize: 'none' }} className={`input h-[49px]   whitespace-pre-wrap textarea textarea-bordered bg-base-200 w-full focus:outline-none rounded-r-none`} type="text" />      

        <button type="submit" className="w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm h-[48px]">Send</button>
      </form>
    </div>
  )
}

export default SendMessage