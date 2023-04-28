const streams={}

export const StreamHandler= (socket)=>{

    const startStream = ({ roomId, message, username }) => {
              const date = new Date();
      
              console.log("streamstart")
              console.log(message)
              console.log(roomId)

              socket.to(roomId).emit("EVENTS.SERVER.ROOM_MESSAGE", {
                message,
                username,
                time: `${date.getHours()}:${date.getMinutes()}`,
              });
            }
         
    const pauseTheStream = (roomId)=>{};
    const startFrom=(roomId)  =>  {};



    socket.on('start-stream', startStream)
    socket.on('pause-stream',pauseTheStream)
    socket.on('start-from',startFrom)


}
