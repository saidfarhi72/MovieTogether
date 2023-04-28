import { useRef } from "react";
import styles from "./rooms.module.css";
import { useSockets } from "../../store";
import EVENTS from "../../config/events";
import { Link, useNavigate } from "react-router-dom";

function RoomsContainer() {
    const { state } = useSockets();
    const { room } = state;
    const {socket,roomId,rooms}=room
    const navigate=useNavigate()

    const newRoomRef = useRef(null);

  function handleCreateRoom() {
    //get the room name
    const roomName = newRoomRef.current.value || "";

    if (!String(roomName).trim()) return;

    // emit room created event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    // set room name input to empty string
    newRoomRef.current.value = "";
  }

  function handleJoinRoom(key) {
    if (key === roomId) return;
    

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  return (
    <nav className={styles.wrapper}>
      <div className={styles.createRoomWrapper}>
        <input ref={newRoomRef} placeholder="Room  name" />
        <button className="cta" onClick={handleCreateRoom}>
          CREATE ROOM
        </button>
      </div>

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
