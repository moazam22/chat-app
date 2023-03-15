import { Flex, Text, useToast } from "@chakra-ui/react";
import { createRef, useEffect, useState } from "react";
import { allUsersOffline, border, selectUserMessage, withTypingHeight } from "../../../utils";
import { ChatboxPropsType } from "../../../utils/interfaces";
import MessageInput from "../../MessageInput/MessageInput";
import UserAvatar from "../../UserAvatar/UserAvatar";
import TypingAnimation from "../TypingAnimation/TypingAnimation";
import ChatHelperText from "./ChatHelperText";

const Chatbox: React.FC<ChatboxPropsType> = ({
  selectedUser,
  onlineUsers,
  messages,
  user,
  socket,
  roomName,
  typing,
}) => {
  const messagesRef = createRef<HTMLDivElement>();
  const [isEmitterSend, setIsEmitterSend] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!!messages?.length && !!messagesRef?.current?.scrollIntoView)
      messagesRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesRef]);

  const sendMessage = (msgBody: string) => {
    if (!!isEmitterSend) socket?.emit("stopTyping", { roomName, userName: user?.name });
    const payload = {
      body: msgBody,
      senderId: user?.id,
      roomName: roomName,
      time: new Date(),
    };

    if (!!socket && !!user?.id && !!roomName) {
      socket.emit("sendMessage", payload);
    } else {
      toast({
        title: "Failed to send message.",
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
  };

  const sendTypingEmitter = () => {
    if (!isEmitterSend) {
      socket?.emit("typing", { roomName, userName: user?.name });
      setIsEmitterSend(true);
    }
  };

  const stopTyping = () => {
    socket?.emit("stopTyping", { roomName, userName: user?.name });
    setIsEmitterSend(false);
  };

  const name = !!selectedUser?.name ? selectedUser.name : "Unknown";

  const height = !!typing ? withTypingHeight : "83%";

  return (
    <Flex
      direction="column"
      flex={1}
      borderTopRightRadius="10px"
      borderBottomRightRadius="10px"
      borderTop={border}
      borderRight={border}
      borderBottom={border}
    >
      {!!selectedUser && !!onlineUsers?.length ? (
        <>
          <Flex h="10%" w="100%" pl="10px" alignItems="center" borderBottom={border}>
            <UserAvatar userName={name} hideOnlineStatus={true} />
            <Text ml="1em" fontWeight="500">
              {name}
            </Text>
          </Flex>
          <Flex maxH={height} minH={height} overflowY="auto" w="100%" flexWrap="wrap">
            {!!messages?.length &&
              messages.map((message, index) => (
                <Flex w="100%" direction="column" m="10px" key={index}>
                  <Flex
                    bg={message.senderId === user?.id ? "#aaaaaa" : "#006cc2"}
                    borderRadius="15px"
                    w="fit-content"
                    direction="column"
                    p="15px"
                    alignSelf={message.senderId === user?.id ? "flex-end" : "flex-start"}
                    color="whitesmoke"
                  >
                    <Text>{message.body}</Text>
                  </Flex>
                </Flex>
              ))}
            <div ref={messagesRef} />
          </Flex>

          <Flex w="100%" h={!!typing ? "9%" : "7%"} flexDirection="column">
            {!!typing && <TypingAnimation typingMessage={typing} />}
            <MessageInput
              sendMessage={sendMessage}
              sendTypingEmitter={sendTypingEmitter}
              stopTyping={stopTyping}
            />
          </Flex>
        </>
      ) : (
        <ChatHelperText message={!onlineUsers?.length ? allUsersOffline : selectUserMessage} />
      )}
    </Flex>
  );
};

export default Chatbox;
