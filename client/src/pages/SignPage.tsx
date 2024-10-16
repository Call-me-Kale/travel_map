import { SignIn } from "../components/sign_in_out_page";
import styled from "@emotion/styled";

export const SignPage = () => {

    return(
        <StyledSignPage>
            <SignIn />
        </StyledSignPage>
    );
};

const StyledSignPage = styled.div`
    height: 100%;
    width: calc(100% - 280px);
    display: grid;
    place-items: center;
`;