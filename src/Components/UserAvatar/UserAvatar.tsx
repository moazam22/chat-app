import { Flex, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Styles from "./UserAvatar.module.css";

interface Props {
  userName: string | null;
  h?: string;
  w?: string;
  hideOnlineStatus?: boolean;
}

const UserAvatar: React.FC<Props> = ({ userName, w, h, hideOnlineStatus }) => {
  const splitName = !!userName ? userName.split(" ") : null;
  const avatar = !!splitName?.length
    ? `${splitName[0][0]?.toUpperCase()}${splitName[1][0]?.toUpperCase()}`
    : "";
  return (
    <Flex
      w={!!w ? w : "50px"}
      h={!!h ? h : "50px"}
      borderRadius="50%"
      bg="#a9bac7"
      justifyContent="center"
      alignItems="center"
      mt="10px"
      mb="10px"
      position="relative"
      color="black"
    >
      <Text fontWeight="600">{avatar}</Text>
      {!hideOnlineStatus && (
        <FontAwesomeIcon icon={faCircle} size="1x" className={Styles.onlineStatus} />
      )}
    </Flex>
  );
};

export default UserAvatar;
