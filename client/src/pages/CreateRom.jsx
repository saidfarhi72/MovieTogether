
import styles from "./createRom.module.css";
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from "react";
import { useSockets } from "../store";
import RoomsContainer from "../components/rooms/rooms";
import MessagesContainer from "../components/stream/stream";
import EVENTS from "../config/events";

export default function Home() {
  const { state, dispatch } = useSockets();
  const { room } = state;
  const {username,socket}=room
  const usernameRef = useRef(null);
  const { id } = useParams();


  useEffect(() => {

    if(id){
  
      dispatch({type:EVENTS.SERVER.JOINED_ROOM,payload:id})
      socket.emit(EVENTS.CLIENT.JOIN_ROOM, id);

      console.log("dooooooooooooooone")
    }

  }, [id,dispatch]);


  
  function handleSetUsername() {
    const value = usernameRef.current.value;
    if (!value) {
      return;
    }
    dispatch({type:"username",payload:value})


    localStorage.setItem("username", value);
  }

  useEffect(() => {
    if (usernameRef)
      usernameRef.current.value = localStorage.getItem("username") || "";
  }, []);

  return (
    <div>
      {!username && (
        <div className={styles.usernameWrapper}>
          <div className={styles.usernameInner}>
            <input placeholder="Username" ref={usernameRef} />
            <button className="cta" onClick={handleSetUsername}>
              START
            </button>
          </div>
        </div>
      )}
      {username && (
        <div className={styles.container}>
          <RoomsContainer />
          <MessagesContainer />
        </div>
      )}
    </div>
  );
}
