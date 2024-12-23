import { FC } from "react";
import styled from "@emotion/styled";
import { Close, ArrowRightAlt } from '@mui/icons-material';

type PopUpProps = {
    onClose?: () => void;  
  }

export const PopUp:FC<PopUpProps> = ({ onClose }) => {

    const ClosePopUpHandler = () => {
        onClose?.();
    };

    const AddFlightHandler = () => {
        
        onClose?.();
    };



    return (
        <PopUpBackground>
            <PopUpContainer>
                <PopUpCloseIcon><Close onClick={() => ClosePopUpHandler()}/></PopUpCloseIcon>
                <PopUpHeader>Dodaj Nowy Lot</PopUpHeader>
                <FlightSelectionWrapper>
                    <SectionHeader>Wybierz skąd podróżowałeś</SectionHeader>
                    <SelectContainer>
                        <FlightInput placeholder="wyszukaj lotnisko...">
                            {/* {data ? data.map(country => <option value={country.name}>{country.name}</option>) : "" } */}
                        </FlightInput>
                    </SelectContainer>
                </FlightSelectionWrapper>
                <FlightSelectionWrapper>
                    <SectionHeader>Wybierz dokąd podróżowałeś</SectionHeader>
                    <SelectContainer>
                        <FlightInput placeholder="wyszukaj lotnisko...">
                            {/* {data ? data.map(country => <option value={country.name}>{country.name}</option>) : "" } */}
                        </FlightInput>
                    </SelectContainer>
                </FlightSelectionWrapper>
                <FlightDateWrapper>
                    <SectionHeader>Wybierz datę lotu</SectionHeader>
                    <FlightInput type="date" />
                </FlightDateWrapper>
                <FlightDateWrapper>
                    <SectionHeader>Wybierz godziny lotu</SectionHeader>
                    <TimeRangeContainer>
                        <FlightInput type="time" />
                        <ArrowRightAlt />
                        <FlightInput type="time" />
                    </TimeRangeContainer>
                </FlightDateWrapper>
                <FlightButtonContainer>
                    <FlightButton onClick={() => AddFlightHandler()}>Dodaj</FlightButton>
                </FlightButtonContainer>
            </PopUpContainer>
        </PopUpBackground>
    );
}


const PopUpBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0000004b;
`;

const PopUpContainer = styled.div`
    position: relative;
    height: 700px;
    width: 600px;
    background: white;
    border-radius: 8px;
`;

const PopUpCloseIcon = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    height: 62px;
    width: 62px;
    display: flex;
    align-items: center;
    justify-content: center;
    

    svg {
        font-size: 30px;
        cursor: pointer;
    }
`;

const PopUpHeader = styled.h4`
    height: 80px;
    width: 60%;
    margin-left: 20%;
    display: flex; 
    align-items: end;
    justify-content: center;
    text-align: center;
    font-size: 150%;
`;

const FlightSelectionWrapper = styled.div`
    height: 80px;
    width: 80%;
    margin-left: 10%; 
    margin-top: 40px;
`;

const SectionHeader = styled.div`
    height: 30px;
    width: 100%;
`;

const SelectContainer = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;  
`;

const FlightInput = styled.input`
    height: 40px;
    width: 180px;
    padding: 4px;
`;


const FlightButtonContainer = styled.div`
    height: 120px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

const FlightButton = styled.button`
    height: 30px;
    width: 80px;
    text-align: center;
`;

const FlightDateWrapper = styled.div`
    height: 80px;
    width: 80%;
    margin-left: 10%; 
    margin-top: 40px;

`;

const TimeRangeContainer = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;  

    svg {
        margin: 0px 20px;
    }
`;