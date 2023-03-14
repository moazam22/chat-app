import { ReactElement } from "react";
import { Socket } from "socket.io-client";
import { UserType } from "../Context/Interfaces";

export interface PublicRoutesPropsTypes {
  redirectTo: string;
  children?: ReactElement;
}

export interface GlobalContextPropsTypes {
  children: ReactElement;
}

export interface OnlineUsersListProps {
  onlineUsers: OnlineUserType[];
  selectedUser: OnlineUserType | null;
  updateSelectedUser: (user: OnlineUserType) => void;
}

export interface ChatboxPropsType {
  onlineUsers: OnlineUserType[];
  selectedUser: OnlineUserType | null;
  messages: MessageType[];
  user: UserType | null;
  socket: Socket | null;
  roomName: string | null;
}

export interface OnlineUserType {
  id: string;
  name: string;
  socketId: string;
}

export interface MessageType {
  body: string;
  roomName: string;
  senderId: string;
}

export interface RoomsType {
  roomName: string;
  messages: MessageType[];
}
