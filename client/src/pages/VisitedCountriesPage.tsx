import styled from "@emotion/styled";
import { CountriesList } from "../components/visited_countries_page";


export const VisitedCoutriesPage = () => {


    return(
        <StyledVisitedCoutriesPage>
            <CountriesList />
        </StyledVisitedCoutriesPage>
    );
};

const StyledVisitedCoutriesPage = styled.div`
    height: 100%;
    width: calc(100% - 280px);

    @media screen and (max-width: 1100px) {
        height: calc(100% - 100px);
        width: 100%;
    }
`;