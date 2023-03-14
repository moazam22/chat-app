import {
  FormControl,
  Input, InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";

interface MessageType {
  msgBody: string;
}

interface Props {
  sendMessage: (msgBody: string) => void;
}

const MessageInput: React.FC<Props> = ({sendMessage}) => {
  const {register, handleSubmit, reset, formState: {errors}} 
    = useForm<MessageType>();
  
  const onSubmit = (data: MessageType) => {
    sendMessage(data.msgBody);
    reset();
  }

  return (
    <form  style={{height: '100%', width: '100%', }} onSubmit={handleSubmit(onSubmit)}>  
      <FormControl isInvalid={!!errors?.msgBody} h='100%'>
        <InputGroup h='100%' >
          <Input
            {...register('msgBody', 
                {
                  required: 'Message is required.'
                }
              )
            } 
            h='100%'
            type='text'
            placeholder="Type here..."
          />
          <InputRightElement>
          {
              <FontAwesomeIcon 
                icon={faPaperPlane}
                color='#c2a400'
                cursor='pointer'
                onClick={() => handleSubmit(onSubmit)()}
              />
          }
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  )
}

export default MessageInput;