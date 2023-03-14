import React, { useContext } from "react";
import { OnlineUsersListProps, OnlineUserType } from "../../utils/interfaces";
import { Flex, Text, Divider } from "@chakra-ui/react";
import UserAvatar from "../UserAvatar/UserAvatar";
import { border } from "../../utils";
import { GlobalContext } from "../../Context/GlobalProvider";

const OnlineUsersList: React.FC<OnlineUsersListProps> = ({
  onlineUsers,
  selectedUser,
  updateSelectedUser,
}) => {
  const { user } = useContext(GlobalContext);
  return (
    <Flex
      w="300px"
      pl="10px"
      borderTopLeftRadius="10px"
      borderBottomLeftRadius="10px"
      direction="column"
      border={border}
    >
      <Flex direction="column" pr="10px" mt="10px">
        <Flex flex="1" direction="column" maxHeight="70vh" overflowY="auto">
          {!!onlineUsers?.length &&
            onlineUsers.map((_user: OnlineUserType, index: number) => {
              const { name: userName } = _user;
              const { id } = _user;
              return (
                <div key={index}>
                  <Flex
                    cursor="pointer"
                    borderRadius="10px"
                    mr="10px"
                    _hover={{ bg: "#006cc2", color: "white" }}
                    onClick={() => updateSelectedUser(_user)}
                    pl="10px"
                    bg={!!selectedUser?.id && selectedUser?.id === _user?.id ? "#006cc2" : ""}
                    color={!!selectedUser && selectedUser === _user ? "whiteSmoke" : "black"}
                  >
                    <UserAvatar userName={!!userName ? userName : ""} />
                    <Flex
                      justifyContent="space-between"
                      flex={1}
                      alignItems="center"
                      mt="10px"
                      mb="10px"
                      pr="10px"
                    >
                      <Text ml="1em">{userName}</Text>
                      {/* {!!notifications?.length &&
                        !!userId &&
                        notifications.includes(userId) &&
                        userId !== selectedUser?.userId && (
                          <FontAwesomeIcon
                            icon={faCircle}
                            size="1x"
                            style={{ color: "#cd4040" }}
                          />
                        )} */}
                    </Flex>
                  </Flex>
                  <Divider />
                </div>
              );
            })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default OnlineUsersList;
