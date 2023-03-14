import { Flex, Text, useToast } from "@chakra-ui/react";
import { createRef, useEffect } from "react";
import { allUsersOffline, border, selectUserMessage } from "../../../utils";
import { ChatboxPropsType } from "../../../utils/interfaces";
import MessageInput from "../../MessageInput/MessageInput";
import UserAvatar from "../../UserAvatar/UserAvatar";
import ChatHelperText from "./ChatHelperText";

const Chatbox: React.FC<ChatboxPropsType> = ({
  selectedUser,
  onlineUsers,
  messages,
  user,
  socket,
  roomName,
}) => {
  const messagesRef = createRef<HTMLDivElement>();
  const toast = useToast();

  useEffect(() => {
    if (!!messages?.length && !!messagesRef?.current?.scrollIntoView)
      messagesRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesRef]);

  const sendMessage = (msgBody: string) => {
    const payload = {
      body: msgBody,
      senderId: user?.id,
      roomName: roomName,
      time: new Date(),
    };
    if (!!socket && !!user?.id && !!roomName) {
      console.log("payload = ", payload);
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

  const name = !!selectedUser?.name ? selectedUser.name : "Unknown";

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
          <Flex maxH="83%" minH="83%" overflowY="auto" w="100%" flexWrap="wrap">
            {!!messages?.length &&
              messages.map((message, index) => (
                <Flex w="100%" direction="column" m="10px" key={index}>
                  <Flex
                    // bg="#c2a400"
                    bg={message.senderId === user?.id ? "#aaaaaa" : "#006cc2"}
                    borderRadius="15px"
                    w="fit-content"
                    direction="column"
                    p="15px"
                    // alignSelf={currentChatMessages?.senderId === user?.id ? 'flex-end' : 'flex-start'}
                    alignSelf={message.senderId === user?.id ? "flex-end" : "flex-start"}
                    color="whitesmoke"
                  >
                    <Text>{message.body}</Text>
                    {/* <Text alignSelf='flex-end' fontSize='10px'>{moment(message.createdAt).format('DD-MM-YYYY hh:mm A')}</Text> */}
                  </Flex>
                </Flex>
              ))}
            <div ref={messagesRef} />
          </Flex>
          <Flex w="100%" h="7%">
            <MessageInput sendMessage={sendMessage} />
          </Flex>
        </>
      ) : (
        <ChatHelperText message={!onlineUsers?.length ? allUsersOffline : selectUserMessage} />
      )}
    </Flex>
  );
};

export default Chatbox;
