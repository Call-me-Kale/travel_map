import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const NavBar = () => {

    return(
        <StyledNavBar>
            <Header>
                <h1>MyTravel</h1>
            </Header>
            <NavLinkContainer>
                <NavLink to='/'>Strona Główna</NavLink>
            </ NavLinkContainer>
            <NavLinkContainer>
                <NavLink to='/visited_countries'>Odwiedzone Kraje</NavLink>
            </ NavLinkContainer>
            <NavLinkContainer>
                <NavLink to='/flies'>Loty</NavLink>
            </ NavLinkContainer>
            <NavLinkContainer>
                <NavLink to='/dashboard'>Dashboard</NavLink>
            </ NavLinkContainer>
            <GapFiller />
            <UserContainer>
                <UserIconContainer>

                </UserIconContainer>
                <UserNameContainer>

                </UserNameContainer>
                <SignOutIconContainer>
                </SignOutIconContainer>
            </UserContainer>
        </StyledNavBar>
    );
};

const StyledNavBar = styled.div`
    height: 100%;
    width: 280px;
    background: #232222;
`;

const Header = styled.div`
    width: 100%;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 160%;

    h1 {
        color: white;
        font-size: 130%;
        cursor: pointer;
    }
`;

const NavLinkContainer = styled.div`
    width: 100%;
    height: 80px; 
    display: flex;
    align-items: center;
    justify-content: center;
    a {
        cursor: pointer;
        transition: 0.5s;
        color: white;
        text-decoration: none; 
    }

    a:hover {
        scale: 1.05;
    }
`;

const GapFiller = styled.div`
    height: calc(100% - 550px);
    width: 100%;
`;

const UserContainer = styled.div`
    height: 90px;
    width: 100%;
    display: flex;
`;

const UserIconContainer = styled.div`
    height: 100%;
    width: 30%;
    /* background: red; */
    
    img {

    }
`;

const UserNameContainer = styled.div`
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background: yellow; */
`;

const SignOutIconContainer = styled.div`
    height: 100%;
    width: 20%;
    /* background: blue;   */
`;
