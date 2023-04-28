import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateRom from './pages/CreateRom';

import { useSockets } from './store';
import { useEffect } from 'react';
import EVENTS from './config/events';


function App() {
  const { state, dispatch } = useSockets();
  const { room } = state;
  const {socket,roomId,username}=room
  
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

    
    <BrowserRouter >
 
    <Routes>
    <Route path="/" element={<CreateRom/>} />
    <Route path="/:id" element={<CreateRom/>} />




      
    </Routes>
  </BrowserRouter>

  );
}

export default App;
