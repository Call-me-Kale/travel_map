import { FliesList } from "../components/flies_page";
import styled from "@emotion/styled";


export const FliesPage = () => {


    return(
        <StyledFliesPage>
            <FliesList />
        </StyledFliesPage>
    );
};

const StyledFliesPage = styled.div`
    height: 100%;
    width: calc(100% - 280px);
`;