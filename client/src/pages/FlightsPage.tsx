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
    position: relative;
    height: 100%;
    width: calc(100% - 280px);

    @media screen and (max-width: 1100px) {
        height: calc(100% - 100px);
        width: 100%;
    }
`;