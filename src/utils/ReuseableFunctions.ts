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
      if (!!socket?.id) localStorage.setItem("socketId", socket.id);
    });
    dispatch({ type: ActionTypes.SET_SOCKET, socket: socket });
  } catch (err) {
    console.error("Connection Failed: ", err);
  }
};
