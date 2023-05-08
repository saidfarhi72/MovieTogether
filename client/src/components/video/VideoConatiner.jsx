import { useEffect, useRef, useState } from "react";
import styles from "./stream.module.css";
import { useSockets } from "../../store";
import EVENTS from "../../config/events";
import ReactPlayer from 'react-player';

//https://vimeo.com/816731498
//https://www.dailymotion.com/video/x7xkbwk

//https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
function VideoConatiner() {
  const { state, dispatch } = useSockets();
  const { room ,streamInfo,playing} = state;
  const {socket,roomId}=room
  const {url,seekto,}=streamInfo
  const playerRef = useRef(null);



  const urlref = useRef(null);

 

  function handleUrl() {
    //get the room name
    const urlin = urlref.current.value || "";

    if (!String(urlin).trim()) return;

    // emit room created event
    socket.emit(EVENTS.CLIENT.CREAT_ROOM_STREAM, {roomId, url:urlin,time:seekto});
    dispatch({type:EVENTS.SERVER.ROOM_STREAM,payload:{url:urlin,seekto}})

    // set room name input to empty string
    urlref.current.value = "";
  }


 

  
  
const handleStart= ()=>{
  dispatch({type:EVENTS.SERVER.STOPED_STREAM,payload:true})
  
  
  socket.emit(EVENTS.CLIENT.STOP_STREAM, {roomId,playing:true});
}


  const handlePause = () => {
    dispatch({type:EVENTS.SERVER.STOPED_STREAM,payload:false})
    socket.emit(EVENTS.CLIENT.STOP_STREAM, {roomId , palying:false});
   

  }
  const handlePlay = () => {
    dispatch({type:EVENTS.SERVER.STOPED_STREAM,payload:true})
    
    
    socket.emit(EVENTS.CLIENT.STOP_STREAM, {roomId,playing:true});


    
   
    
  }


    
  useEffect(() => {
    socket.on(EVENTS.SERVER.CHANGED_TIME_STREAM, (value) => {
      playerRef.current.seekTo(value);
      dispatch({type:EVENTS.SERVER.CHANGED_TIME_STREAM,payload:value})

      
      
      
    });
    return () => {
      socket.off(EVENTS.SERVER.CHANGED_TIME_STREAM);
    };
   
  }, [socket,dispatch]);

 

    const handleSeek = () => {
      const time = playerRef.current.getCurrentTime();
      if(time!==seekto){

        socket.emit(EVENTS.CLIENT.CHANGE_TIME_STREAM, {roomId,time});
      dispatch({type:EVENTS.SERVER.CHANGED_TIME_STREAM,payload:time})
      }


    }
    const handleError = ()=>{
      console.log('erooooor')
    }
    const handleReady = ()=>{
      console.log('ready')
      dispatch({type:EVENTS.SERVER.STOPED_STREAM,payload:true})
    
    
    socket.emit(EVENTS.CLIENT.STOP_STREAM, {roomId,playing:true});
    }
    const [loading, setLoading] = useState(false);
  
    const handleBuffer = () => {
      setLoading(true);
      console.log('startburffer')
    socket.emit(EVENTS.CLIENT.STOP_STREAM, {roomId , palying:false});

    }
    const handleBufferEnd = () => {
      setLoading(true);
      console.log('endbuffer')
      dispatch({type:EVENTS.SERVER.STOPED_STREAM,payload:true})
    
    
    socket.emit(EVENTS.CLIENT.STOP_STREAM, {roomId,playing:true});

    };
 

  if (!roomId) {
    return <div />;
  }

  return (
    <div className={styles.wrapper}>
      
      <div className={styles.createRoomWrapper}>
        <input ref={urlref} placeholder="Room  name" />
        <button className="cta" onClick={handleUrl}>
          CREATE ROOM
        </button>
      </div>

{
  url &&(
    <div className="App">
      <ReactPlayer
      width='1000px' 
      height='500px'
        ref={playerRef}
        url={url}
        playing={playing}
        volume={0.5}
        loop={true}
        onSeek={handleSeek}
    
        controls={true}
        onPlay={handlePlay}
        onPause={handlePause} 
        onReady={handleReady}
        onBuffer={handleBuffer}
        onBufferEnd={handleBufferEnd}
       // onProgress={handleProgress}
        
        onStart={handleStart}
        onError={handleError}
      />
      
    </div>)

}


    </div>
  );
}

export default VideoConatiner;