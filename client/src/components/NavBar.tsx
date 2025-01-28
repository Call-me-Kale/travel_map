import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logOut } from "../store/slices";
import { Menu, Close } from '@mui/icons-material';

export const NavBar = () => {
    const dispatch = useAppDispatch();
    const isLogged = useAppSelector(state => state.userSlice.user.isAuthenticated);
    const [ isMobile, setIsMobile ] = useState(window.innerWidth < 1100);
    const [ isBurgerOpen, toggleIsBurgerOpen ] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1100);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    const MobileLogoutHandler = () => {
        dispatch(logOut());
        toggleIsBurgerOpen(!isBurgerOpen);
    };

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
            {isLogged ? 
                <UserContainer>
                    <UserIconContainer>
                        <IconBackground>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/></svg>
                        </IconBackground>
                    </UserIconContainer>
                    <UserNameContainer>
                        <p>UserName</p>
                    </UserNameContainer>
                    <SignOutIconContainer>
                        <svg onClick={() => dispatch(logOut())} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
                    </SignOutIconContainer>
                </UserContainer>
            : 
            <UserContainer>
                <UserIconContainer>
                    <IconBackground>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/></svg>
                    </IconBackground>
                </UserIconContainer>
                <UserNameContainer>
                    <Link to={'/login'}>LogIn</Link> |
                    <Link to={'/register'}>Register</Link>
                </UserNameContainer>
            </UserContainer>
            }
            { isMobile && 
                <BurgerContainer>
                    {isBurgerOpen 
                    ?   
                        <>
                            <Close onClick={ () => toggleIsBurgerOpen(!isBurgerOpen) } />
                            <BurgerMenu>
                                <NavLinks>
                                    <NavLinkContainerMobile>
                                        <NavLink onClick={ () => toggleIsBurgerOpen(!isBurgerOpen) } to='/'>Strona Główna</NavLink>
                                    </ NavLinkContainerMobile>
                                    <NavLinkContainerMobile>
                                        <NavLink onClick={ () => toggleIsBurgerOpen(!isBurgerOpen) } to='/visited_countries'>Odwiedzone Kraje</NavLink>
                                    </ NavLinkContainerMobile>
                                    <NavLinkContainerMobile>
                                        <NavLink onClick={ () => toggleIsBurgerOpen(!isBurgerOpen) } to='/flies'>Loty</NavLink>
                                    </ NavLinkContainerMobile>
                                    <NavLinkContainerMobile>
                                        <NavLink onClick={ () => toggleIsBurgerOpen(!isBurgerOpen) } to='/dashboard'>Dashboard</NavLink>
                                    </ NavLinkContainerMobile>
                                </NavLinks>
                                <MobileGapFiller />
                                {isLogged ? 
                                    <UserContainerMobile>
                                        <UserIconContainer>
                                            <IconBackground>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/></svg>
                                            </IconBackground>
                                        </UserIconContainer>
                                        <UserNameContainer>
                                            <p>UserName</p>
                                        </UserNameContainer>
                                        <SignOutIconContainer>
                                            <svg onClick={() => MobileLogoutHandler()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
                                        </SignOutIconContainer>
                                    </UserContainerMobile>
                                : 
                                <UserContainerMobile>
                                    <UserIconContainer>
                                        <IconBackground>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/></svg>
                                        </IconBackground>
                                    </UserIconContainer>
                                    <UserNameContainer>
                                        <Link onClick={ () => toggleIsBurgerOpen(!isBurgerOpen) } to={'/login'}>LogIn</Link> |
                                        <Link onClick={ () => toggleIsBurgerOpen(!isBurgerOpen) } to={'/register'}>Register</Link>
                                    </UserNameContainer>
                                </UserContainerMobile>
                                }
                            </BurgerMenu>
                        </>
                    :
                        <Menu onClick={ () => toggleIsBurgerOpen(!isBurgerOpen) } />
                    }

                </BurgerContainer>
            }
 
        </StyledNavBar>
    );
};

const StyledNavBar = styled.div`
    height: 100%;
    width: 280px;
    background: #232222;
    

    @media screen and (max-width: 1100px) {
        height: 100px;
        width: 100%;
        display: flex;
    }
`;

const Header = styled.div`
    width: 100%;
    height: 160px;
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

    @media screen and (max-width: 1100px) {
        height: 100%;
        width: 300px;
    }
`;

const NavLinks = styled.div`
    width: 100%;
    height: 300px; 
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 100px;
`;

const NavLinkContainer = styled.div`
    width: 100%;
    height: 60px; 
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

    @media screen and (max-width: 1100px) {
        display: none;
  }
`;

const NavLinkContainerMobile = styled.div`
    width: 100%;
    height: 60px; 
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 130%;
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
    height: calc(100% - 500px);
    width: 100%;


    @media screen and (max-width: 1100px) {
        height: 100%;
        width: calc(100% - 400px);
    }
`;

const MobileGapFiller = styled.div`
    height: calc(100% - 600px);
    width: 100%;


`;

const UserContainer = styled.div`
    height: 90px;
    width: 100%;
    display: flex;

    @media screen and (max-width: 1100px) {
        display: none;
    }
`;

const UserContainerMobile = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const UserIconContainer = styled.div`
    height: 100%;
    width: 30%;
    /* background: red; */
    display: flex;
    align-items: center;
    justify-content: end;

    @media screen and (max-width: 1100px){
        width: 50px;
    }
`;

const IconBackground = styled.div`
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 50%;  

    svg {
        height: 20px;
        transition: 0.5s;
    }

`;

const UserNameContainer = styled.div`
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    color: white;
    margin-left: 10px;
    a {
        margin: 0px 8px;
        color: #1976d2;
        text-decoration: underline;
    }

    @media screen and (max-width: 1100px){
        width: 150px;
    }
`;

const SignOutIconContainer = styled.div`
    height: 100%;
    width: 20%;
    /* background: blue;   */
    display: flex; 
    align-items: center;
    justify-content: start;

    svg {
        height: 24px;
        fill: white;
    }

    @media screen and (max-width: 1100px){
        width: 30px;
    }
`;

const BurgerContainer = styled.div`
    height: 100%;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        color: white;
        font-size: 40px;
        cursor: pointer;
    }
`;

const BurgerMenu = styled.div`
    position: absolute;
    height: 90svh;
    width: 100svw;
    background: #232222;
    left: 0;
    top: 10svh;
    z-index: 99999;
`;