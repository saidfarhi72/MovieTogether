import { v4 as uuidV4 } from "uuid";


const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM",
    CREAT_ROOM_STREAM: "CREAT_ROOM_STREAM",
    STOP_STREAM: "STOP_ROOM_STREAM",
    WAITING_STREAM: "WAITING_STREAM",
    READY_STREAM: "READY_STREAM",
    CHANGE_TIME_STREAM: "CHANGE_TIME_STREAM",





  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
    ROOM_STREAM: "ROOM_STREAM",
    STOPED_STREAM: "STOPED_ROOM_STREAM",
    DONE_WAITING_STREAM: "DONE_WAITING_STREAM",
    DONE_READY_STREAM: "DONE_READY_STREAM",
    CHANGED_TIME_STREAM: "CHANGED_TIME_STREAM",





  },
};


const rooms= {};
const stream={}
const userwait =[]




export const RoomHandler = (socket)=>{

  console.log(`Sockets enabled`);

 

    socket.emit(EVENTS.SERVER.ROOMS, rooms);

    /*
     * When a user creates a new room
     */
    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
      console.log({ roomName });
      // create a roomId
      const roomId = uuidV4();
      // add a new room to the rooms object
      rooms[roomId] = {
        name: roomName,
      };

      socket.join(roomId);

      // broadcast an event saying there is a new room
      socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

      // emit back to the room creator with all the rooms
      socket.emit(EVENTS.SERVER.ROOMS, rooms);
      // emit event back the room creator saying they have joined a room
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    });

    /*
     * When a user sends a room message
     */

    socket.on(
      EVENTS.CLIENT.SEND_ROOM_MESSAGE,
      ({ roomId, message, username }) => {
        const date = new Date();

        console.log(roomId, message, username)
        socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
          message,
          username,
          time: `${date.getHours()}:${date.getMinutes()}`,
        });
      }
    );

    /*
     * When a user joins a room
     */
    socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {
      socket.join(roomId);
      console.log(stream)
      if(stream[roomId]){

        socket.emit(EVENTS.SERVER.ROOM_STREAM, stream[roomId]);
      }


      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
      console.log("joined")  
      });

      socket.on(EVENTS.CLIENT.CREAT_ROOM_STREAM, ({roomId,time,url}) => {
        console.log("from nthing", roomId)
        stream[roomId]={
          ...stream[roomId],

          time:time,
          url:url
        }
        console.log("from stream:",stream[roomId])
        socket.to(roomId).emit(EVENTS.SERVER.ROOM_STREAM, stream[roomId]);

      
      console.log("STREAN SEND")  
      });
      socket.on(EVENTS.CLIENT.STOP_STREAM, ({roomId,playing}) => {
        console.log("from nthing", roomId)
        stream[roomId]={
          ...stream[roomId],

          stop:playing
        }
        console.log("from stream:",stream[roomId])
        socket.to(roomId).emit(EVENTS.SERVER.STOPED_STREAM, playing);

      
      console.log("STREAN SEND")  
      });
      socket.on(EVENTS.CLIENT.WAITING_STREAM, ({roomId,username,waiting}) => {
        console.log("from nthing", roomId)
        stream[roomId]={
          ...stream[roomId],

          waiting:waiting
         }
         if (userwait.includes(username)) {
          console.log('Element already exists in array.');
        } else {
          userwait.push(username);
          console.log('Element added to array.');
        }
         console.log("from stream:",stream[roomId])

         console.log("user",userwait)

        
           socket.broadcast.emit(EVENTS.SERVER.DONE_WAITING_STREAM, waiting);
           if (userwait.includes("ana") && userwait.includes("howa")) {
            socket.broadcast.emit(EVENTS.SERVER.DONE_READY_STREAM, true);
            socket.emit(EVENTS.SERVER.DONE_READY_STREAM, true);

          }
         

      
      console.log("waiting send SEND")  
      });

      socket.on(EVENTS.CLIENT.CHANGE_TIME_STREAM, ({roomId,time}) => {
        console.log("from nthing", roomId)
        stream[roomId]={
          ...stream[roomId],
          time:time,
        }
        console.log("from stream the time is:",stream[roomId].time)
        socket.to(roomId).emit(EVENTS.SERVER.CHANGED_TIME_STREAM, time);

      
      console.log("seek into time SEND")  
      });
      

      
        
}