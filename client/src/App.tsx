import styled from "@emotion/styled";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import { NavBar } from "./components";
import { MainPage, DashboardPage, FlightsPage, VisitedCoutriesPage, LogInPage, RegisterPage,  RetrivePasswordPage, RetrivePasswordSuccessPage, ResetPasswordPage } from "./pages";

const App = () => {
  const isAuth = useAppSelector(state => state.userSlice.user.isAuthenticated);
  return (
    <StyledApp>
      <NavBar />
      <Routes>
          {isAuth ? 
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
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          :
          <Route path="/">
            <Route index path="/login" element={<LogInPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/retrive_password" element={< RetrivePasswordPage />} />
            <Route path="/retrive_password_success" element={<RetrivePasswordSuccessPage />} />
            <Route path="/reset_password" element={<ResetPasswordPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </ Route>
          }
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
