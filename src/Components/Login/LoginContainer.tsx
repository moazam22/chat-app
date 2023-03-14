import { MainContainer, FormContainer } from "./Login.styled";
import LoginForm from "./LoginForm";

const LoginContainer = () => {
  return (
    <MainContainer>
      <FormContainer>
        <LoginForm />
      </FormContainer>
    </MainContainer>
  )
}

export default LoginContainer