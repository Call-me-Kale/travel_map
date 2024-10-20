import { FC } from "react";
import styled from "@emotion/styled";

export const Fly: FC<any> = () => {

    return(
        <StyledFly>
            <></>
        </StyledFly>
    );
};

const StyledFly = styled.div`
    height: 80px;
    width: 100%;
    border-bottom: 1px solid black;  
`;