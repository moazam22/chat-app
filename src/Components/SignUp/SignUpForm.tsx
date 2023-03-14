import { ApolloError } from '@apollo/client';
import {
  Button, Flex, FormControl, Text, useToast
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ActionTypes } from '../../Context/AppReducer';
import { GlobalContext } from '../../Context/GlobalProvider';
import { CreateUserInput, SignupMutation, useSignupMutation } from '../../generated/graphql';
import { passwordConst } from '../../utils';
import { signupSchema } from '../../utils/FormSchemas';
import InputField from '../InputField/InputField';

const SignUpForm = () => {
  const [showPass, setShowPass] = useState(false);
  const signupForm = useForm<CreateUserInput>({
    resolver: yupResolver(signupSchema),
  });

  const { handleSubmit } = signupForm;

  const {dispatch} = useContext(GlobalContext);
  const navigate = useNavigate();

  const [SignupMutation, { loading, error }] = useSignupMutation({
    onCompleted: (data: SignupMutation) =>onSignupSuccess(data), onError: (err: ApolloError)=> showErrorToaster(err)
  });

  const toast = useToast();

  const onSubmit = (data: CreateUserInput) => {
    console.log('data = ', data);
    SignupMutation({
      variables: {
        createUserInput: data
      }
    });
  }

  const onSignupSuccess = (data: SignupMutation) => {
    const {signup} = data;
    if(!!signup && signup?.status === 201)
      {
        toast({
          title: 'Signed up successfully.',
          status: 'success',
          isClosable: true,
          position: 'top',
        })
        navigate('/login');
      }
    else{
      showErrorToaster(null);
    }
  }

  const showErrorToaster = (err: ApolloError | null) => {
    return (
      toast({
        title: !!error?.message ? error.message : !!err?.message ? err.message : 'Login Failed',
        status: 'error',
        isClosable: true,
        position: 'top',
      })
    );
  }

  const toggleShowPass = useCallback(() => setShowPass((prevShowPass) => !prevShowPass),[]);

  return (
    <FormProvider {...signupForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex  mt='1em' w='95%' ml='1em' justifyContent='center' alignItems='center'>
            <Text fontSize='xl' fontWeight='500'>Sign Up</Text>
        </Flex> 
        
        <InputField 
          label = {'Name'}
          name = {'name'}
          type = {'text'}
        />

        {/* <InputField 
          label = {'Last Name'}
          name = {'lastName'}
          type = {'text'}
        /> */}

        <InputField 
          label = {'Email'}
          name = {'email'}
          type = {'text'}
        />

        <InputField 
            label = {'Password'}
            name = {passwordConst}
            type = {passwordConst}
            toggleShowPass = {toggleShowPass}
            showPass = {showPass}
        />

        <FormControl mt='2em' ml='1em' mb='1em'>
          <Flex w='90%' alignItems='center' justifyContent='space-between'>
            <Button  
              isLoading={loading} 
              type="submit" 
              name="Login"  
              bg='#006cc2'
              color='whitesmoke'
              _hover={{bg: '#006cc2', color: 'whitesmoke'}}
            > 
              Sign up
            </Button>
            <Text 
              fontSize='14px' 
              textDecoration='underline' 
              color='#006cc2'
              cursor='pointer'
              onClick={()=>navigate('/login')}
              _hover={{ color: '#0a0ab4'}}
            >
              Already have an account? Go-to Login
            </Text>
          </Flex>  
        </FormControl>
      </form>
    </FormProvider>
  )
}

export default SignUpForm;