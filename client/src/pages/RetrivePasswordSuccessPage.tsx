import { useState } from "react";
import styled from "@emotion/styled";
import { RetrivePasswordSuccess } from "../components/login_register_page";

export const RetrivePasswordSuccessPage = () => {
    
    return(
        <StyledRetrivePasswordSuccessPage>
            <RetrivePasswordSuccess />
        </StyledRetrivePasswordSuccessPage>
    );
};

const StyledRetrivePasswordSuccessPage = styled.div`
    height: 100%;
    width: calc(100% - 280px);
    display: flex;
    align-items: center;
    flex-direction: column;
`;