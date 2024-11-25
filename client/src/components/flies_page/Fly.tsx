import { FC } from "react";
import { Data } from './FliesList';
import styled from "@emotion/styled";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

interface DataI {
    data: Data;
}

export const Fly: FC<DataI> = ({data}) => {

    const { flynumber, from, to, duration } = data;

    return(
        <StyledFly>
            <FromAirport>
                <ConteinersHeader>From</ConteinersHeader>
                <ContainersValue>{from}</ContainersValue>
            </FromAirport>
            <ArrowContainer>
                <ArrowRightAltIcon />
            </ArrowContainer>
            <ToAirport>
                <ConteinersHeader>To</ConteinersHeader>
                <ContainersValue>{to}</ContainersValue>
            </ToAirport>
            <Departues>
                <ConteinersHeader></ConteinersHeader>
                <ContainersValue></ContainersValue>
            </Departues>
            <Arrival>
                <ConteinersHeader></ConteinersHeader>
                <ContainersValue></ContainersValue>
            </Arrival>
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
    display: flex;
`;

const FromAirport = styled.div`
    height: 100%;
    width: 15%;
`;

const ArrowContainer = styled.div`
    height: 100%;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ToAirport = styled.div`
    height: 100%;
    width: 15%;
`;

const Departues = styled.div`
    height: 100%;
    width: 15%;
`;

const Arrival = styled.div`
    height: 100%;
    width: 15%;
`;

const ConteinersHeader = styled.div`
    height: 30%;
    width: 100%;
    color: gray;
    display: flex;
    align-items: end;
    font-size: 80%;

    p {

    }
`;

const ContainersValue = styled.div`
    height: 70%;
    width: 100%;

    p {

    }
`;