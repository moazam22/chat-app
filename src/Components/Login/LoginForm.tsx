import { Button, Flex, FormControl, Text, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ActionTypes } from "../../Context/AppReducer";
import { GlobalContext } from "../../Context/GlobalProvider";
import { LoginMutation, LoginDto, useLoginMutation } from "../../generated/graphql";
import { passwordConst } from "../../utils";
import { loginSchema } from "../../utils/FormSchemas";
import { makeSocketConnection } from "../../utils/ReuseableFunctions";
// import { gteOnlineUsers, makeSocketConnection } from '../../utils/ReuseableFuctions';
import InputField from "../InputField/InputField";

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const LoginForm = useForm<LoginDto>({
    resolver: yupResolver(loginSchema),
  });
  const { handleSubmit } = LoginForm;

  const [loginMutation, { loading, error }] = useLoginMutation({
    onCompleted: (data: LoginMutation) => onLogin(data),
    onError: () => showErrorToaster(),
  });

  const { dispatch, user } = useContext(GlobalContext);
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = (data: LoginDto) => {
    loginMutation({
      variables: {
        loginInput: data,
      },
    });
  };

  const onLogin = async (data: LoginMutation) => {
    const { login } = data;
    if (!!login?.access_token) {
      localStorage.setItem("user", JSON.stringify(login));
      makeSocketConnection(login.access_token, dispatch);
      dispatch({ type: ActionTypes.SET_USER, user: { ...login } });
      navigate("/");
    } else {
      showErrorToaster();
    }
  };

  const showErrorToaster = () => {
    return toast({
      title: !!error?.message ? error.message : "Login Failed",
      status: "error",
      isClosable: true,
      position: "top",
    });
  };

  const toggleShowPass = useCallback(() => setShowPass((prevShowPass) => !prevShowPass), []);

  return (
    <FormProvider {...LoginForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex mt="1em" w="95%" ml="1em" justifyContent="center" alignItems="center">
          <Text fontSize="xl" fontWeight="500">
            Login
          </Text>
        </Flex>

        <InputField label={"Email"} name={"email"} type={"text"} />

        <InputField
          label={"Password"}
          name={passwordConst}
          type={passwordConst}
          toggleShowPass={toggleShowPass}
          showPass={showPass}
        />

        <FormControl mt="2em" ml="1em" mb="1em">
          <Flex w="90%" alignItems="center" justifyContent="space-between">
            <Button
              isLoading={loading}
              type="submit"
              name="Login"
              bg="#006cc2"
              color="whitesmoke"
              _hover={{ bg: "#006cc2", color: "whitesmoke" }}
            >
              Login
            </Button>
            <Flex direction="column" alignItems="flex-start">
              <Text
                fontSize="14px"
                textDecoration="underline"
                color="#006cc2"
                cursor="pointer"
                onClick={() => navigate("/sign-up")}
                _hover={{ color: "#0a0ab4" }}
              >
                Don't have an account? Sign-up
              </Text>
              {/* <Text 
                fontSize='14px' 
                textDecoration='underline' 
                color='#c2a400'
                cursor='pointer'
                onClick={()=>navigate('/forgot-password')}
                _hover={{ color: '#0a0ab4'}}
              >
                Forgot Password?
              </Text> */}
            </Flex>
          </Flex>
        </FormControl>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
