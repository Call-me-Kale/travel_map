import { FC, useState, useEffect } from "react";
import { Data } from './FlightsList';
import styled from "@emotion/styled";
import { ArrowRightAlt, Edit, Delete, Today, InsertInvitation, Timer, FlightLand, FlightTakeoff } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import { PopUp } from "./CreateEditPopUp";

export interface DataI {
    data: Data;
}

export const Flight: FC<DataI> = ({data}) => {

    const [ isEditing, setIsEditing ] = useState(false);
    const { flightnumber, from, to, duration, date } = data;
    const [ isMobile, setIsMobile ] = useState(window.innerWidth < 1100);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1100);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return(
        <StyledFly>
            {isMobile 
            ? 
            <>
                <TravelDestinations>
                    <FromAirport>
                        <ContainersValue><Tooltip title="flight from"><div><FlightTakeoff /><p>{from}</p></div></Tooltip></ContainersValue>
                    </FromAirport>
                    <ArrowContainer>
                        <ArrowRightAlt />
                    </ArrowContainer>
                    <ToAirport>
                        <ContainersValue><Tooltip title="flight to"><div><span>{to}</span><FlightLand /></div></Tooltip></ContainersValue>
                    </ToAirport>
                </TravelDestinations>
                <DateContainer>
                    <Date>
                        <ContainersValue><Tooltip title="departure date"><div><Today /><p>{date}</p></div></Tooltip></ContainersValue>
                    </Date>
                </DateContainer>
                <DateContainer>
                    <Duration>
                        <ContainersValue><Tooltip title="flight duration"><div><Timer /><p>{duration}</p></div></Tooltip></ContainersValue>
                    </Duration>
                </DateContainer>
                <Buttons>
                    <ButtonContainer>   
                        <EditButton>
                            <Edit onClick={() => setIsEditing(true)} />
                        </EditButton>
                    </ButtonContainer>
                    <ButtonContainer>
                        <RemoveButton>
                            <Delete/>
                        </RemoveButton>    
                    </ButtonContainer>
                </Buttons>
                {isEditing && <PopUp mode={"edit"} onClose={() => setIsEditing(false)} data={data} />}
            </>
            :
                <>
                    <FromAirport>
                        <ContainersValue><Tooltip title="flight from"><div><FlightTakeoff /><p>{from}</p></div></Tooltip></ContainersValue>
                    </FromAirport>
                    <ArrowContainer>
                        <ArrowRightAlt />
                    </ArrowContainer>
                    <ToAirport>
                        <ContainersValue><Tooltip title="flight to"><div><span>{to}</span><FlightLand /></div></Tooltip></ContainersValue>
                    </ToAirport>
                    <Date>
                        <ContainersValue><Tooltip title="departure date"><div><Today /><p>{date}</p></div></Tooltip></ContainersValue>
                    </Date>
                    <Duration>
                        <ContainersValue><Tooltip title="flight duration"><div><Timer /><p>{duration}</p></div></Tooltip></ContainersValue>
                    </Duration>
                    <GapFiller />
                    <ButtonContainer>   
                        <EditButton>
                            <Edit onClick={() => setIsEditing(true)} />
                        </EditButton>
                    </ButtonContainer>
                    <ButtonContainer>
                        <RemoveButton>
                            <Delete/>
                        </RemoveButton>    
                    </ButtonContainer>
                    {isEditing && <PopUp mode={"edit"} onClose={() => setIsEditing(false)} data={data} />}
                </>
            }
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
    flex-direction: row;

    @media screen and (max-width: 1100px) {
        height: 380px;
        width: 300px;
        margin: 18px 0px;
        margin-left: 10px;
        border-radius: 8px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); 
        flex-direction: column;

    }
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

    @media screen and (max-width: 1100px){
        width: 50px;
    }
`;

const ToAirport = styled.div`
    height: 100%;
    width: 120px;

    div {
        justify-content: start;
    }
`;

const TravelDestinations = styled.div`
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Duration = styled.div`
    height: 100%;
    width: 170px;
`;

const Date = styled.div`
    height: 100%;
    width: 200px;
`;

const DateContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
`;

const ContainersValue = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        p {
            margin-left: 10px;
        }

        span {
            margin-right: 10px;
        }
    }


`;

const Buttons = styled.div`
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    width: calc(100% - 850px);
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