import { FlightsList } from "../components/flies_page";
import styled from "@emotion/styled";


export const FlightsPage = () => {


    return(
        <StyledFlightsPage>
            <FlightsList />
        </StyledFlightsPage>
    );
};

const StyledFlightsPage = styled.div`
    height: 100%;
    width: calc(100% - 280px);
`;