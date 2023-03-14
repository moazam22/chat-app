import { Dispatch } from "react";
import { io } from "socket.io-client";
import { Action, ActionTypes } from "../Context/AppReducer";

export const makeSocketConnection = (token: string, dispatch: Dispatch<Action>) => {
  try {
    const socket = io("http://localhost:4000", {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    socket.on("connect", function () {
      console.log("Socket ID = ", socket.id);
      if (!!socket?.id) localStorage.setItem("socketId", socket.id);
      // let lsMessages = localStorage.getItem('messages');
      // const messages: Message[] = !!lsMessages ? JSON.parse(lsMessages) : [];
      // if(!!messages && !!messages?.length)
      //   dispatch({type: ActionTypes.SET_MESSAGES, messages: [...messages]});
    });
    dispatch({ type: ActionTypes.SET_SOCKET, socket: socket });
  } catch (err) {
    console.error("Connection Failed: ", err);
  }
};
