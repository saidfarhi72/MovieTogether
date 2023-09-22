import React, {  useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSockets } from '../store';
import EVENTS from '../config/events';

function SideBar() {
    const { state } = useSockets();
    const { room } = state;
    const {socket,roomId,rooms}=room
    const [activeButton, setActiveButton] = useState(''); // Initialize with the default active button


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
    
    <div className="drawer max-w-fit fixed h-screen mt-10  top-0 bg-base-100 z-30 lg:drawer-open">
      
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col items-center bg-transparent  justify-center">
        {/* Page content here */}
        
        <label htmlFor="my-drawer-2" className="btn btn-circle bg-transparent  drawer-button swap lg:hidden swap-rotate">
  
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" />
            
            {/* hamburger icon */}
            <svg xmlns="http://www.w3.org/2000/svg"  height="24" viewBox="0 -960 960 960" width="24"><path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/></svg>            
            {/* close icon */}
            <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
            
          </label>
          
    
    </div> 
    <div className="   drawer-side ">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
        <ul className="menu pt-16 w-80 h-full flex space-y-6 bg-base-100    text-lg items-center ">
        {/* Sidebar content here */}
   
      <div class="form-control">
      <label class="label">
        <span class="label-text">Create new Room</span>
      </label>
      <label class="input-group">
        <input type="text"ref={newRoomRef} placeholder="Room  name" class="input input-bordered" />
        <span onClick={handleCreateRoom} >create</span>
      </label>
    </div>

        {Object.keys(rooms).map((key) => {
          return (
            <li onClick={() => setActiveButton(key)} className={`w-full ${activeButton===key ? "bg-neutral text-base-100 ":"hover:bg-base-300 hover:text-base-100"}    rounded-lg  flex justify-center items-center  text-center`} >
            <Link key={key} className='w-full flex justify-center items-center' to={`/${key}`}>            
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

            </li>
          );
        })}
        
        


        </ul>
    
    </div>
    </div> 
     )
}

export default SideBar