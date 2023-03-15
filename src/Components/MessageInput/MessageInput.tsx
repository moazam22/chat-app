import { FormControl, Input, InputGroup, InputRightElement, Text, Flex } from "@chakra-ui/react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";

interface MessageType {
  msgBody: string;
}

interface Props {
  sendMessage: (msgBody: string) => void;
  sendTypingEmitter: () => void;
  stopTyping: () => void;
}

const MessageInput: React.FC<Props> = ({ sendMessage, sendTypingEmitter, stopTyping }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageType>();

  const onSubmit = (data: MessageType) => {
    sendMessage(data.msgBody);
    reset();
  };

  const debouncedTyping = (fn: () => void, delay: number) => {
    let timer: string | number | NodeJS.Timeout | undefined;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn();
      }, delay);
    };
  };

  const typing = debouncedTyping(stopTyping, 1000);

  return (
    <form style={{ height: "100%", width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors?.msgBody} h="100%">
        <InputGroup h="100%">
          <Input
            {...register("msgBody", {
              required: "Message is required.",
            })}
            // onChange={() => {
            //   sendTypingEmitter();
            //   typing();
            // }}
            onKeyDown={(e) => {
              if (e.key !== "Enter") {
                sendTypingEmitter();
                typing();
              }
            }}
            h="100%"
            type="text"
            placeholder="Type here..."
          />
          <InputRightElement>
            {
              <FontAwesomeIcon
                icon={faPaperPlane}
                color="#006cc2"
                cursor="pointer"
                onClick={() => handleSubmit(onSubmit)()}
              />
            }
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  );
};

export default MessageInput;
