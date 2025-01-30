import { useEffect } from "react";
import styled from "@emotion/styled";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { postLoginByToken } from "./store/slices";
import { NavBar } from "./components";
import { MainPage, DashboardPage, FlightsPage, VisitedCoutriesPage, LogInPage, RegisterPage,  RetrivePasswordPage, RetrivePasswordSuccessPage, ResetPasswordPage, OpenedCountryCardPage } from "./pages";

window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("lastUrl", window.location.pathname);
});

const App = () => {
  const { isAuthenticated } = useAppSelector(state => state.userSlice.user);
  const token = sessionStorage.getItem("token");
  const dispatch = useAppDispatch();




  useEffect(() => {
    if (token && !isAuthenticated) {
      dispatch(postLoginByToken({token}));
    }
  }, [token, isAuthenticated, dispatch]);


  return (
    <StyledApp>
      <NavBar />
      <Routes>
          {isAuthenticated ? 
            <Route path="/">
              <Route index element={<MainPage />} />
              <Route path="/visited_countries" element={<VisitedCoutriesPage />} />
              <Route path="/visited_countries/:id" element={<OpenedCountryCardPage />} />
              <Route path="/flies" element={<FlightsPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
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
  flex-direction: row;

  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }
`;

export default App;
