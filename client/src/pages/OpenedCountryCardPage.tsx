import { OpenedCountryCard } from "../components/visited_countries_page";
import styled from "@emotion/styled";

export const OpenedCountryCardPage = () => {

    return(
        <StyledOpenedCountryCardPage>
            <OpenedCountryCard />
        </StyledOpenedCountryCardPage>
    );
};

const StyledOpenedCountryCardPage = styled.div`
    height: 100%;
    width: calc(100% - 280px);
    display: flex;
    align-items: center;
    flex-direction: column;

    @media screen and (max-width: 1100px) {
        height: calc(100% - 100px);
        width: 100%;
    }
`;