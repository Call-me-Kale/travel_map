import styled from "@emotion/styled";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components";
import { MainPage, DashboardPage, FlightsPage, VisitedCoutriesPage, LogInPage, RegisterPage,  RetrivePasswordPage, RetrivePasswordSuccessPage, ResetPasswordPage } from "./pages";

const App = () => {
  return (
    <StyledApp>
      <NavBar />
      <Routes>
        <Route path="/">
          <Route index element={<MainPage />} />
          <Route path="/visited_countries" element={<VisitedCoutriesPage />} />
          <Route path="/flies" element={<FlightsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/retrive_password" element={< RetrivePasswordPage />} />
          <Route path="/retrive_password_success" element={<RetrivePasswordSuccessPage />} />
          <Route path="/reset_password" element={<ResetPasswordPage />} />
        </ Route>
      </Routes>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

export default App;
