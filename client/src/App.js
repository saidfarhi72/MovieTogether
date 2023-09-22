import { useEffect } from "react";
import ChatBox from "./components/ChatBox";
import SendMessage from "./components/SendMessage";
import EVENTS from "./config/events";
import { useSockets } from "./store";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Room from "./pages/Room";
import Navbar from "./components/Navbar";


function App() {

  const { state, dispatch } = useSockets();
  const { room } = state;
  const {socket,roomId,username}=room
  const navigate=useNavigate()

  
  useEffect(() => {
    window.onfocus = function () {
      document.title = "Chat app";
    };
  }, []);

  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    dispatch({type:EVENTS.SERVER.ROOMS,payload:value})

  });

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    dispatch({type:EVENTS.SERVER.JOINED_ROOM,payload:value})
    navigate(`/${value}`)

    dispatch({type:"NEW_JOINED",payload:{}})
  });
  socket.on(EVENTS.SERVER.ROOM_STREAM, (value) => {
    dispatch({type:EVENTS.SERVER.ROOM_STREAM,payload:value})

  });
  socket.on(EVENTS.SERVER.STOPED_STREAM, (value) => {
    dispatch({type:EVENTS.SERVER.STOPED_STREAM,payload:value})

  });

  
 



  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
      if (!document.hasFocus()) {
        document.title = "New message...";
      }

      dispatch({type:EVENTS.SERVER.ROOM_MESSAGE,payload:{ message, username, time }})
      
      
      
    });
    return () => {
      socket.off(EVENTS.SERVER.ROOM_MESSAGE);
    };
  }, [socket]);

  return (
    <div>

    <Navbar/>
 
    <Routes>
    <Route path="/" element={<Room/>} />
    <Route path="/:id" element={<Room/>} />




      
    </Routes>

    </div>
  );
}

export default App;
