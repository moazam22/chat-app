import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import Styles from "./TypingAnimation.module.css";

interface Props {
  typingMessage: string;
}

const TypingAnimation: React.FC<Props> = ({ typingMessage }) => {
  return (
    <Flex alignItems="center">
      <Text pl="5px" color="#006cc2" fontSize="12px" fontWeight="600">
        {typingMessage}
      </Text>
      <Flex ml="5px">
        <div className={Styles.typingIndicator}></div>
        <div className={Styles.typingIndicator}></div>
        <div className={Styles.typingIndicator}></div>
      </Flex>
    </Flex>
  );
};

export default TypingAnimation;
