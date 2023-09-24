import { useRef } from "react";
import styles from "./rooms.css";

import { Link, useNavigate } from "react-router-dom";
import { useSockets } from "../store";
import EVENTS from "../config/events";

function RoomsContainer() {
    const { state } = useSockets();
    const { room,socket ,rooms} = state;
    const {roomId}=room

  
  function handleJoinRoom(key) {
    if (key === roomId) return;
    

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }


  return (
    <nav className={styles.wrapper}>
     
   

      <ul className={styles.roomList}>
        {Object.keys(rooms).map((key) => {
          return (
            <Link key={key} to={`/${key}`}>            
            <div key={key}>
              <button
                disabled={key === roomId}
                title={`Join ${rooms[key].name}`}
                onClick={() => handleJoinRoom(key)}
              >
                {rooms[key].name}
              </button>
            </div>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}

export default RoomsContainer;
