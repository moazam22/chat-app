import { Socket } from "socket.io-client";
import { InitState, UserType } from "./Interfaces";

const LS_USER = localStorage.getItem("user");

export const initialState: InitState = {
  user: !!LS_USER ? JSON.parse(LS_USER) : null,
  socket: null,
  dispatch: () => {
    return;
  },
};

export enum ActionTypes {
  SET_USER = "setUser",
  SET_SOCKET = "setSocket",
}

export type Action =
  | { type: ActionTypes.SET_USER; user: UserType | null }
  | { type: ActionTypes.SET_SOCKET; socket: Socket | null };

export default function appReducer(state: InitState, action: Action) {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case ActionTypes.SET_SOCKET:
      return {
        ...state,
        socket: action.socket,
      };
    default:
      return state;
  }
}
