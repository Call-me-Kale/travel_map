import { FC } from "react";
import { Data } from './FliesList';
import styled from "@emotion/styled";

interface DataI {
    data: Data;
}

export const Fly: FC<DataI> = ({data}) => {

    const { flynumber, from, to, duration } = data;

    return(
        <StyledFly>
            <></>
        </StyledFly>
    );
};

const StyledFly = styled.div`
    height: 80px;
    width: 90%;
    margin: 18px 0px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); 
`;
