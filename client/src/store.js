
import { io } from 'socket.io-client';
  
import Cookies from 'js-cookie';
import { createContext, useContext, useReducer } from 'react';
import EVENTS from "./config/events.js";


const SOCKET_URL="http://localhost:4000" 
const socket = io(SOCKET_URL);


export const Store = createContext();
const initialState = {
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  room: {
    socket: socket,
    username: '',

    rooms: Cookies.get('rooms')
      ? JSON.parse(Cookies.get('rooms'))
      : {},
    roomId: Cookies.get('roomId')
      ? Cookies.get('roomId')
      : '',
    messages:[]

  },
  streamInfo:{
    url: Cookies.get('url')
      ? Cookies.get('url')
      : '',
    seekto:0,
    
    
  },
  playing : false,
  waiting : true,
  
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };
    case EVENTS.SERVER.ROOMS: {
      const rooms= action.payload
      return { ...state, room: { ...state.room,rooms:rooms  } };
    }
    case EVENTS.SERVER.JOINED_ROOM: {
      const roomId= action.payload

      return {  ...state,  room: { ...state.room, roomId: roomId },  };    }
   
    case EVENTS.SERVER.ROOM_MESSAGE:
      const message= action.payload
      


      return { ...state, room: { ...state.room,messages:[...state.room.messages,message]  } };
    case EVENTS.SERVER.ROOM_STREAM:
      const stream= action.payload
      


      return { ...state, streamInfo:  stream   };
    case "NEW_JOINED":

        
      return { ...state, room: { ...state.room,messages:[]  } };
    case EVENTS.SERVER.STOPED_STREAM:
        
        return { ...state, playing:action.payload };
    case EVENTS.SERVER.DONE_WAITING_STREAM:
           
         return { ...state, waiting:action.payload };

    
    case EVENTS.SERVER.CHANGED_TIME_STREAM:
             
          return { ...state, streamInfo: { ...state.streamInfo, seekto: action.payload }};
  
        
    case 'username':
      return { ...state, room: { ...state.room, username: action.payload }};
    case 'USER_LOGIN':
      return { ...state, userInfo: action.payload };
    case 'USER_LOGOUT':
      return {
        ...state,
        userInfo: null,
        stream: {
          streamItems: [],
          rooms: { location: {} },
          roomId: '',
        },
      };

    default:
      return state;
  }
}
export const useSockets = () => useContext(Store);


export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}





  
