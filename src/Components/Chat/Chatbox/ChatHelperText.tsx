import { Flex, Text } from "@chakra-ui/react";
interface Props {
  message: string;
}

const ChatHelperText: React.FC<Props> = ({ message }) => {
  return (
    <Flex justifyContent="center" alignItems="center" h="100%">
      <Text fontWeight="600" fontSize="2xl" color="#006cc2">
        {message}
      </Text>
    </Flex>
  );
};

export default ChatHelperText;
