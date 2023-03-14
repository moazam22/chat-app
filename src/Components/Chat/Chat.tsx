import { Flex } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../Context/GlobalProvider";
import OnlineUsersList from "./OnlineUsers";
import { MessageType, OnlineUserType, RoomsType } from "../../utils/interfaces";
import Chatbox from "./Chatbox/Chatbox";
import { UserType } from "../../Context/Interfaces";
import { Socket } from "socket.io-client";

const Chat = () => {
  // eslint-disable-next-line no-mixed-operators
  const [onlineUsers, setOnlineUsers] = useState<OnlineUserType[]>([]);
  // eslint-disable-next-line no-self-compare
  const [selectedUser, setSelectedUser] = useState<OnlineUserType | null>(null);
  const [filteredOnlineUsers, setFilteredOnlineUsers] = useState<OnlineUserType[]>([]);
  const [rooms, setRooms] = useState<RoomsType[]>([]);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const { socket, user } = useContext(GlobalContext);

  const filterOnlineUsers = useCallback(
    (onlineUsers: OnlineUserType[]) => {
      if (!user?.id) return;
      const filteredOnlineUser = onlineUsers.filter((_user) => _user.id !== user.id);
      setFilteredOnlineUsers([...filteredOnlineUser]);
    },
    [user]
  );

  useEffect(() => {
    socket?.on("onlineUsers", ({ onlineUsers }) => {
      setOnlineUsers([...onlineUsers]);
    });

    socket?.on("roomJoined", (data) => {
      handleReceivedMessages(data, true);
      setSelectedRoom(data.roomName);
    });

    socket?.on("messages", (data) => {
      handleReceivedMessages(data, false);
    });

    return () => {
      socket?.off("onlineUsers");
      socket?.off("roomJoined");
      socket?.off("messages");
    };
  }, [socket]);

  useEffect(() => {
    if (!!selectedUser && !!rooms?.length) {
      loadMessages(selectedUser);
    }
  }, [rooms, selectedUser]);

  const handleReceivedMessages = (data: RoomsType, newRoomCreated: boolean) => {
    const _rooms = [...rooms];
    const index = isRoomExist(data.roomName);
    index === -1 ? _rooms.push(data) : (_rooms[index].messages = [...data.messages]);
    setRooms([..._rooms]);
    if ((!!selectedRoom && selectedRoom === data.roomName) || !!newRoomCreated) {
      console.log("cause of fired 3");
      setMessages([...data.messages]);
    }
  };

  useEffect(() => {
    if (!!user?.id && !!onlineUsers?.length) {
      filterOnlineUsers(onlineUsers);
    }
  }, [user, onlineUsers, filterOnlineUsers]);

  useEffect(() => {
    if (!!selectedUser && !!user?.id && !!socket) {
      const index = isRoomExist(`${user.id}&${selectedUser.id}`);
      if (index === -1) {
        const res = isRoomExist(`${selectedUser.id}&${user.id}`);
        if (res === -1) {
          joinRoom(user, selectedUser, socket);
        } else {
          console.log("fired1");
          setMessages(rooms[res].messages);
          setSelectedRoom(rooms[res].roomName);
        }
      } else {
        console.log("fired2");
        setMessages(rooms[index].messages);
        setSelectedRoom(rooms[index].roomName);
      }
    }
  }, [selectedUser, user, socket]);

  const isRoomExist = (roomName: string): number => {
    const index = rooms.findIndex((room) => room.roomName === roomName);
    return index;
  };

  const loadMessages = (user: OnlineUserType) => {
    // eslint-disable-next-line array-callback-return
    const room = rooms.filter((_room) => {
      const users = _room.roomName.split("&");
      if (!!users.includes(user.id)) return _room.messages;
    })[0];
    if (!!room?.messages?.length) {
      console.log("fired3");
      setMessages([...room.messages]);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSelectedUser = useCallback((user: OnlineUserType) => {
    setSelectedUser(user);
  }, []);

  const joinRoom = (user: UserType, selectedUser: OnlineUserType, socket: Socket) => {
    const payload = {
      roomName: `${user.id}&${selectedUser.id}`,
      hostId: user.id,
      users: [{ id: user.id, name: user.name, socketId: socket.id }, selectedUser],
      isGroup: false,
    };
    socket?.emit("joinRoom", payload);
  };

  console.log("ROOMS ============= ", rooms);

  return (
    <Flex pt="2em" pb="1em" h="90vh" ml="5%" mr="5%">
      <button
        onClick={() => {
          console.log("socketId = ", socket?.id);
          console.log("selectedRoom = ", selectedRoom);
        }}
      >
        Room
      </button>
      <button onClick={() => console.log("selectedRoom = ", rooms)}>All rooms</button>
      <OnlineUsersList
        onlineUsers={filteredOnlineUsers}
        selectedUser={selectedUser}
        updateSelectedUser={updateSelectedUser}
      />
      <Chatbox
        onlineUsers={filteredOnlineUsers}
        selectedUser={selectedUser}
        messages={messages}
        user={user}
        socket={socket}
        roomName={selectedRoom}
      />
    </Flex>
  );
};

export default Chat;
