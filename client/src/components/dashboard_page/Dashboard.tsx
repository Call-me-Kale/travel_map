import styled from "@emotion/styled";
import CircularProgress, {
    CircularProgressProps,
  } from '@mui/material/CircularProgress';

export const Dashboard = () => {

    return(
        <StyledDashboard>
            <VisitedCountriesCounterContainer>
                <StyledCircularProgress variant="determinate" value={20}></StyledCircularProgress>
            </VisitedCountriesCounterContainer>
        </StyledDashboard>
    );
};

const StyledDashboard = styled.div`
    height: 100%;
    width: 100%;
`;

const VisitedCountriesCounterContainer = styled.div`
    height: 400px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledCircularProgress = styled(CircularProgress)`
    
`;