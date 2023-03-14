import SignUpForm from "./SignUpForm";
import { MainContainer, FormContainer } from "../Login/Login.styled";

const SignUpContainer = () => {
  return (
    <MainContainer>
      <FormContainer>
        <SignUpForm/>
      </FormContainer>
    </MainContainer>
  )
}

export default SignUpContainer