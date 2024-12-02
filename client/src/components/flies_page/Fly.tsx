import { FC } from "react";
import { Data } from './FliesList';
import styled from "@emotion/styled";
import { ArrowRightAlt, Edit, Delete, Today, Timer, FlightLand, FlightTakeoff } from '@mui/icons-material';

interface DataI {
    data: Data;
}

export const Fly: FC<DataI> = ({data}) => {

    const { flynumber, from, to, duration, date } = data;

    return(
        <StyledFly>
            <FromAirport>
                <ContainersValue><FlightTakeoff /><p>{from}</p></ContainersValue>
            </FromAirport>
            <ArrowContainer>
                <ArrowRightAlt />
            </ArrowContainer>
            <ToAirport>
                <ContainersValue><span>{to}</span><FlightLand /></ContainersValue>
            </ToAirport>
            <Duration>
                <ContainersValue><Timer /><p>{duration}h</p></ContainersValue>
            </Duration>
            <Date>
                <ContainersValue><Today /><p>{date}</p></ContainersValue>
            </Date>
            <GapFiller />
            <ButtonContainer>   
                <EditButton>
                    <Edit />
                </EditButton>
            </ButtonContainer>
            <ButtonContainer>
                <RemoveButton>
                    <Delete/>
                </RemoveButton>    
            </ButtonContainer>
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
    width: 120px;

    div {
        justify-content: end;
    }
`;

const ArrowContainer = styled.div`
    height: 100%;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ToAirport = styled.div`
    height: 100%;
    width: 120px;

    div {
        justify-content: start;
    }
`;

const Duration = styled.div`
    height: 100%;
    width: 120px;
`;

const Date = styled.div`
    height: 100%;
    width: 220px;
`;

const ContainersValue = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        margin-left: 10px;
    }

    span {
        margin-right: 10px;
    }

`;

const ButtonContainer = styled.div`
    height: 100%;
    width: 62px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const EditButton = styled.button`
    height: 42px;
    width: 42px;  
    border-radius: 8px;
    border: none;
    font-size: 200%;
    text-align: center;
    box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 0px 3px 0 rgba(0, 0, 0, 0.29);
    background: #ffff;
    font-weight: 300;
    transition: 0.5s;
    cursor: pointer;

    &:hover {
        scale: 1.05;
    }
`;
const GapFiller = styled.div`
    width: calc(100% - 820px);
`;

const RemoveButton = styled.button`
    height: 42px;
    width: 42px;  
    border-radius: 8px;
    border: none;
    font-size: 200%;
    text-align: center;
    box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 0px 3px 0 rgba(0, 0, 0, 0.29);
    background: #ffff;
    font-weight: 300;
    transition: 0.5s;
    cursor: pointer;

    &:hover {
        scale: 1.05;
    }
`;