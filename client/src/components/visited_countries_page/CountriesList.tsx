import { useState, useRef } from "react";
import { useAppSelector } from "../../store/hooks";
import styled from "@emotion/styled";
import { Country } from "./Country";
import { Edit, Close } from '@mui/icons-material';
import { useAppDispatch } from "../../store/hooks";
import { getUserCards, postCountryCard } from "../../store/slices";
import { CountryCard } from "../../store/slices";

export interface Data {
    cardDescription: string;
    countryName: string;
    id: number;
    userId: number;
}

export const CountriesList = () => {
    const [ isCreating, setIsCreating ] = useState<boolean>(false);
    const [ newCardDescription, setNewCardDescription ] = useState<string>("");
    const [ isSearching, setIsSearching ] = useState<boolean>(false);
    const [ searchValue, setSearchValue ] = useState<string>('');
    const selectedValue = useRef<HTMLSelectElement>(null);
    const userId = useAppSelector((state) => state.userSlice.user.userData.id);
    const data = useAppSelector((state) => state.countryCardsSlice.countryCards);
    let filteredData: CountryCard[] = [];
    const countries = useAppSelector((state) => state.countryCardsSlice.countries);
    const dispatch = useAppDispatch();

    const AddCountryHandler = () => {
        const formatedSelectedValue = selectedValue.current!.value;
        dispatch(postCountryCard({userId, cardDescription: newCardDescription, countryCode: formatedSelectedValue, countryName: selectedValue.current!.textContent !== null ? selectedValue.current!.textContent : ""}));
        setIsCreating(false);
        window.location.reload();
    }

    filteredData = data.filter((card) => card.countryName.toLowerCase().includes(searchValue.toLowerCase()));

    const SearchHandler = () => {
        setIsSearching(true);
        
        
    }

    return (
        <StyledCountryList>
            <Header>
                <Text>Twoje podróże</Text>
            </Header>
            <ListHeader>
                <SearchInputContainer>
                    <StyledInput onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder="search..." />
                </SearchInputContainer>
                <ButtonContainer onClick={() => setIsCreating(true)}>
                    <StyledAddCountryButton>+</StyledAddCountryButton>
                </ButtonContainer>
                
            </ListHeader>

                <List>
                    {filteredData.map((country, i) => {
                        return <Country data={country} key={i}/>
                    })}
                </List>


            { isCreating &&
                <PopUpBackground>
                    <PopUpContainer>
                        <PopUpCloseIcon><Close onClick={() => setIsCreating(false)} /></PopUpCloseIcon>
                        <PopUpHeader>Dodaj Nowy Kraj Do Listy Odwiedzonych</PopUpHeader>
                        <CountrySelectionWrapper>
                            <SectionHeader>Wybierz kraj</SectionHeader>
                            <SelectContainer>
                                <SelectCountryInput ref={selectedValue} defaultValue={"Afganistan"}>
                                    {countries ? countries.map((country, i) => <option value={country.code} key={i}>{country.name_pl}</option>) : "" }
                                </SelectCountryInput>
                            </SelectContainer>
                        </CountrySelectionWrapper>
                        <CountryImageWrapper>
                            <SectionHeader>Dodaj zdjęcie</SectionHeader>
                            <UploadImageContainer>
                                <UploadImageInput type="file" />
                            </UploadImageContainer>
                        </CountryImageWrapper>   
                        <CountryDescriptionWrapper>
                            <SectionHeader>Wprowadź opis</SectionHeader>
                            <TextAreaContainer>
                                <StyledTextArea onChange={(e) => setNewCardDescription(e.target.value)} placeholder="Tekst..." />
                            </TextAreaContainer>
                        </CountryDescriptionWrapper>
                        <CountryButtonContainer>
                            <CountryButton onClick={() => AddCountryHandler()}>Dodaj</CountryButton>
                        </CountryButtonContainer>
                    </PopUpContainer>
                </PopUpBackground>
            }
        </StyledCountryList>
    );
};

const StyledCountryList = styled.div`
    height: 100%;
    width: 100%;  
    overflow-x: hidden;
    overflow-y: hidden;
    position: relative;
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
    height: calc(100% - 240px);
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

const PopUpBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0000004b;
`;

const PopUpContainer = styled.div`
    position: relative;
    height: 700px;
    width: 600px;
    background: white;
    border-radius: 8px;
`;

const PopUpCloseIcon = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    height: 62px;
    width: 62px;
    display: flex;
    align-items: center;
    justify-content: center;
    

    svg {
        font-size: 30px;
        cursor: pointer;
    }
`;

const PopUpHeader = styled.h4`
    height: 110px;
    width: 60%;
    margin-left: 20%;
    display: flex; 
    align-items: end;
    justify-content: center;
    text-align: center;
    font-size: 150%;
`;

const CountrySelectionWrapper = styled.div`
    height: 80px;
    width: 80%;
    margin-left: 10%; 
    margin-top: 40px;
`;

const SectionHeader = styled.div`
    height: 30px;
    width: 100%;
`;

const SelectContainer = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;  
`;

const SelectCountryInput = styled.select`
    height: 40px;
    width: 180px;
    padding: 4px;
`;

const CountryImageWrapper = styled.div`
    height: 50px;
    width: 80%;
    margin-left: 10%; 
    margin-top: 40px;
`;

const UploadImageContainer = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;  
`;

const UploadImageInput = styled.input`
    height: 40px;
    width: 280px;
    padding: 4px;
`

const CountryDescriptionWrapper = styled.div`
    height: 200px;
    width: 80%;
    margin-left: 10%; 
    margin-top: 40px;
`;

const TextAreaContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;  
`;

const StyledTextArea = styled.textarea`
    height: 180px;
    width: 280px;
    padding: 4px;
    resize: none;
`;

const CountryButtonContainer = styled.div`
    height: 120px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

const CountryButton = styled.button`
    height: 30px;
    width: 80px;
    text-align: center;
`;