import styled from "@emotion/styled";
import { Country } from "./Country";
import { Edit } from '@mui/icons-material';

export interface Data {
    name: string;
    img: string;
    description: string;
}

export const CountriesList = () => {
    const data: Data[] = [
        {
            name: 'Poland',
            img: './img/poland.jpeg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            name: 'Italy',
            img: './img/italy.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            name: 'Japan',
            img: './img/japan.jpeg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            name: 'Japan',
            img: './img/japanpeg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            name: 'Japan',
            img: './img/japan.jpeg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            name: 'Japan',
            img: './impan.jpeg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            name: 'Japan',
            img: './img/japan.jpeg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            name: 'Japan',
            img: './img/jap',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            name: 'Japan',
            img: './img/japan.jpeg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
    ]
    return (
        <StyledCountryList>
            <Header>
                <Text>Twoje podróże</Text>
            </Header>
            <ListHeader>
                <SearchInputContainer>
                    <StyledInput type="text" placeholder="search..." />
                </SearchInputContainer>
                <ButtonContainer>
                    <StyledAddCountryButton>+</StyledAddCountryButton>
                </ButtonContainer>
                <ButtonContainer>
                    <StyledEditCountriesButton><Edit /></StyledEditCountriesButton>    
                </ButtonContainer>
                
            </ListHeader>
            <List>
                {data.map((country, i) => {
                    return <Country data={country} key={i}/>
                })}
            </List>
        </StyledCountryList>
    );
};

const StyledCountryList = styled.div`
    height: 100%;
    width: 100%;  
    overflow-x: hidden;
    overflow-y: hidden;
`;

const ListHeader = styled.div`
    height: 84px;
    width: calc(95% - 20px);
    margin-left: calc(5% + 20px);
    display: flex;
    align-items: center;
    position: relative;
`;

const SearchInputContainer = styled.div`
    height: 42px;
    width: 220px;
`;

const ButtonContainer = styled.div`
    height: 42px;
    width: 52px;
    display: flex;
    justify-content: end;
`;

const StyledInput = styled.input`
    height: 100%;
    width: calc(100% - 10px);
    padding-left: 10px;
    border-radius: 8px;
    border: none;
    outline: none;
    font-size: 90%;
    box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 0px 3px 0 rgba(0, 0, 0, 0.39);
    transition: 0.5s;

    &:hover {
        scale: 1.05;
    }
`;

const StyledAddCountryButton = styled.button`
    height: 100%;
    width: calc(100% - 10px);
    border-radius: 8px;
    border: none;
    font-size: 200%;
    color: white;
    text-align: center;
    background: #07e207;
    font-weight: 300;
    transition: 0.5s;
    cursor: pointer;

    &:hover {
        scale: 1.05;
    }
`;

const StyledEditCountriesButton = styled.button`
    height: 100%;
    width: calc(100% - 10px);
    border-radius: 8px;
    border: none;
    font-size: 200%;
    color: black;
    text-align: center;
    background: white;
    box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 0px 3px 0 rgba(0, 0, 0, 0.29);
    font-weight: 300;
    transition: 0.5s;
    cursor: pointer;

    &:hover {
        scale: 1.05;
    }
`;

const List = styled.div`
    height: calc(100% - 140px);
    width: 95%;
    margin-left: 5%;  
    display: flex;
    flex-wrap: wrap;
    overflow-x: hidden;
    overflow-y: auto;

`;
const Header = styled.div`
    height: 140px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Text = styled.h2`
    font-size: 220%;
`;