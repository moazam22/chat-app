import { memo } from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import { 
  FormControl, 
  FormLabel, 
  Input, 
  InputGroup, 
  InputRightElement,
  FormErrorMessage,
} from '@chakra-ui/react';
import { passwordConst } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface Props {
  label: string;
  type: string;
  name: string;
  showPass?: boolean;
  marginLeft?: string;
  defaulValue?: string;
  toggleShowPass?: () => void;
}

const InputField: React.FC<Props> = ({
  label, 
  type, 
  name, 
  showPass, 
  marginLeft,
  defaulValue,
  toggleShowPass}) => {
  const {control} = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={!!defaulValue ? defaulValue : ''}
      render = {({field, fieldState: { error: { message } = {} } }) => (
        <FormControl mt='1em' w='95%' ml={marginLeft ? marginLeft : '1em'} isInvalid={!!message}>
          <FormLabel>{label}</FormLabel>
            {
              name !== passwordConst
              ? (
                <Input  
                  {...field}
                  id={name} 
                  type={type}
                  placeholder={`Enter ${label}`}
                />
              ): (
                <InputGroup size='md'>
                    <Input
                      {...field}
                      id="password" 
                      pr='4.5rem'
                      type={showPass ? 'text' : 'password'}
                      placeholder='Enter password'
                    />
                    <InputRightElement width='4.5rem'>
                      <FontAwesomeIcon 
                        cursor='pointer' 
                        icon={showPass ? faEye : faEyeSlash} 
                        onClick={toggleShowPass}
                      />
                    </InputRightElement>
                  </InputGroup>
              )
            }
            {
              !!message && <FormErrorMessage>{message}</FormErrorMessage>
            }
        </FormControl>
      )}
    />
  )
}

export default memo(InputField)