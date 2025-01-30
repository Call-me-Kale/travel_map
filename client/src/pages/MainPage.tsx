import styled from "@emotion/styled";
import { MapChart } from "../components/main_page";

export const MainPage = () => {

    return(
        <StyledMainPage>
            <MapChart />
        </StyledMainPage>
    );
};

const StyledMainPage = styled.div`
    height: 100%;
    width: calc(100% - 280px);  
    display: flex;

    @media screen and (max-width: 1100px) {
        height: calc(100% - 100px);
        width: 100%;
    }
`;