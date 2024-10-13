import styled from "@emotion/styled";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components";
import { MainPage, DashboardPage, FliesPage, VisitedCoutriesPage } from "./pages";

const App = () => {
  return (
    <StyledApp>
      <NavBar />
      <Routes>
        <Route path="/">
          <Route index element={<MainPage />} />
          <Route path="/visited_countries" element={<VisitedCoutriesPage />} />
          <Route path="/flies" element={<FliesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
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
