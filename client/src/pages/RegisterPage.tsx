import { Register } from "../components/login_register_page"
import styled from "@emotion/styled";

export const RegisterPage = () => {

    return(
        <StyledRegisterPage>
            <Register />
        </StyledRegisterPage>
    );
};

const StyledRegisterPage = styled.div`
    height: 100%;
    width: calc(100% - 280px);
    display: flex;
    align-items: center;
    flex-direction: column;
`;