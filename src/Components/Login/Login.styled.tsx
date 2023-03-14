import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    align-items: center;
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    border-radius: 10px;
    
    @media (max-width: 1023px) {
        width: 90%;
    }

    @media (max-width: 767px) {
        box-shadow: none;
    }
`;
