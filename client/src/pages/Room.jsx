
import styles from "./room.css";
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from "react";
import { useSockets } from "../store";

import EVENTS from "../config/events";
import ChatBox from "../components/ChatBox";
import SendMessage from "../components/SendMessage";
import SideBar from "../components/Sidbar";
import VideoConatiner from "../components/VideoConatiner";

export default function Room() {
  const { state, dispatch } = useSockets();
  const { room } = state;
  const {username,socket,roomId}=room
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
    if (!username){

      if (usernameRef)
        usernameRef.current.value = localStorage.getItem("username") || "";
    }
  }, []);

  return (
    <div className="">
      {!username && (
        <div className={styles.usernameWrapper}>
          <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">MovieTogether</h1>
              <p className="py-6">
            platform for wathcing film with friends
                .</p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="text"placeholder="Username" ref={usernameRef} className="input input-bordered" />
                </div>
                
                <div className="form-control mt-6">
                  <button className="btn btn-primary" onClick={handleSetUsername}>Enter</button>
                </div>
              </div>
            </div>
          </div>
        </div>
          
        </div>
      )}
      {username && (
        <div className='flex flex-row pt-20'>
            <SideBar/>
{
  
            roomId &&
            <>
            <VideoConatiner/>
            <div className="w-[30%]">

            <ChatBox />
            <SendMessage />
            </div>
              
            </>

}

            
        </div>
      )}
    </div>
  );
}
