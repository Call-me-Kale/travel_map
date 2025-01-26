import { useState } from "react";
import styled from "@emotion/styled";
import { ResetPassword } from "../components/login_register_page";

export const ResetPasswordPage = () => {

    return(
        <StyledResetPasswordPage>
            <ResetPassword />
        </StyledResetPasswordPage>
    );
};

const StyledResetPasswordPage = styled.div`
    height: 100%;
    width: calc(100% - 280px);
    display: flex;
    align-items: center;
    flex-direction: column;
`;