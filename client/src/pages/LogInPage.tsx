import { LogIn } from "../components/login_register_page";
import styled from "@emotion/styled";

export const LogInPage = () => {

    return(
        <StyledLogInPage>
            <LogIn />
        </StyledLogInPage>
    );
};

const StyledLogInPage = styled.div`
    height: 100%;
    width: calc(100% - 280px);
    display: flex;
    align-items: center;
    flex-direction: column;

    @media screen and (max-width: 1100px) {
        height: calc(100% - 100px);
        width: 100%;
    }
`;