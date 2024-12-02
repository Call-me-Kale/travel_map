import styled from "@emotion/styled";
import { Dashboard } from "../components/dashboard_page";


export const DashboardPage = () => {


    return(
        <StyledDashboardPage>
            <Dashboard />
        </StyledDashboardPage>
    );
};

const StyledDashboardPage = styled.div`
    height: 100%;
    width: calc(100% - 280px);
`;