import { useState } from "react";
import styled from "@emotion/styled";
import { RetrivePassword } from "../components/login_register_page";

export const RetrivePasswordPage = () => {

    return(
        <StyledRetrivePasswordPage>
            <RetrivePassword />
        </StyledRetrivePasswordPage>
    );
};

const StyledRetrivePasswordPage = styled.div`
    height: 100%;
    width: calc(100% - 280px);
    display: flex;
    align-items: center;
    flex-direction: column;
`;