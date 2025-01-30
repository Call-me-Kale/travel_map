import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import styled from "@emotion/styled";

export const OpenedCountryCard = () => {
    const data = useAppSelector((state) => state.countryCardsSlice.lastOpenedCountryCard)

    return(
        <StyledOpenedCountryCard>
            <></>
            
        </StyledOpenedCountryCard>
    );
};

const StyledOpenedCountryCard = styled.div`
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