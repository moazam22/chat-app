import { Dispatch } from "react";
import { Socket } from "socket.io-client";
import { Action } from "./AppReducer";

export interface UserType {
  access_token?: string | undefined | null;
  id?: string | undefined;
  name?: string | null | undefined;
  email?: string | undefined;
  __typename?: string | undefined;
}

export interface InitState {
  user: UserType | null;
  socket: Socket | null;
  dispatch: Dispatch<Action>;
}
