import { useState } from "react";
import styled from "@emotion/styled";
import { FormControl, Checkbox } from "@mui/material";
import { FilterAlt, FilterAltOff, ExpandLess, ExpandMore, North, South, Close } from '@mui/icons-material';
import { Fly } from "./Fly";

export interface Data {
    flynumber: string;
    from: string;
    to: string;
    duration: string;
}

export const FliesList = () => {
    const tempdata: Data[] = [
        {
            flynumber: '',
            from: 'CWA',
            to: 'VEZ',
            duration: '',
        },
        {
            flynumber: '',
            from: 'UJG',
            to: 'NHG',
            duration: '',
        },
        {
            flynumber: '',
            from: 'IJK',
            to: 'FBG',
            duration: '',
        },
        {
            flynumber: '',
            from: 'TFG',
            to: 'UYH',
            duration: '',
        },
        {
            flynumber: '',
            from: 'WEF',
            to: 'WJY',
            duration: '',
        },
        {
            flynumber: '',
            from: 'DVG',
            to: 'UJG',
            duration: '',
        },
        {
            flynumber: '',
            from: 'THC',
            to: 'RHB',
            duration: '',
        },
        {
            flynumber: '',
            from: 'OKJ',
            to: 'GVF',
            duration: '',
        },
        {
            flynumber: '',
            from: 'FRH',
            to: 'JHF',
            duration: '',
        },
        {
            flynumber: '',
            from: 'DFC',
            to: '',
            duration: '',
        },
        {
            flynumber: '',
            from: 'CCV',
            to: 'EFD',
            duration: '',
        },
    ];

    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    return(
        <>
            <Header>Twoje Loty</Header>
            <ListHeader>
                <SearchInputContainer>
                    <StyledInput type="text" placeholder="search..." />
                </SearchInputContainer>
                <AddFlightContainer>
                    <StyledAddFlightButton>+</StyledAddFlightButton>
                </AddFlightContainer>
                <GapFiller />
                {isFilterOpen ? 
                <FilterButtonContainerOpened >
                    <FilterHeader>
                        <FilterHeaderText>
                            Opcje Filtrowania    
                        </FilterHeaderText> 
                        <CloseIconContainer onClick={() => setIsFilterOpen(false)}>
                            <Close />
                        </CloseIconContainer>                       
                    </FilterHeader>
                    <FilterOption>
                        <North />
                        <p>Sortuj Rosnąco</p>
                    </FilterOption>
                    <FilterOption>
                        <South />
                        <p>Sortuj Malejąco</p>
                    </FilterOption>
                    <FilterOption>
                        <FilterAltOff />
                        <p>Wyczyść Filtry</p>
                    </FilterOption>
                    <FilterCheckboxOption>
                        <Checkbox defaultChecked/>
                        <p>Filter</p>
                    </FilterCheckboxOption>
                    <FilterCheckboxOption>
                        <Checkbox />
                        <p>Wyczyść Filtry</p>
                    </FilterCheckboxOption>
                    <FilterCheckboxOption>
                        <Checkbox />
                        <p>Wyczyść Filtry</p>
                    </FilterCheckboxOption>
                </FilterButtonContainerOpened>
                : 
                <FilterButtonContainerClosed onClick={() => setIsFilterOpen(true)}>
                    <StyledFilterAltIcon />
                </FilterButtonContainerClosed>
                }
            </ListHeader>
            <StyledFliesList>
                {
                    tempdata[0] && tempdata.map((data:any, key:any) => {
                        return <Fly data={data} key={key}/>
                    })
                }
            </StyledFliesList>
        </>
    );
};

const Header = styled.h2`
    height: 140px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 220%;
`;

const ListHeader = styled.div`
    height: 84px;
    width: calc(90% - 10px);
    margin-left: 5%;
    display: flex;
    align-items: center;
    position: relative;
`;

const SearchInputContainer = styled.div`
    height: 42px;
    width: 220px;
`;

const AddFlightContainer = styled.div`
    height: 42px;
    width: 52px;
    display: flex;
    justify-content: end;
`;

const GapFiller = styled.div`
    height: 100%;
    width: calc(90% - 320px);
`;

const FilterButtonContainerClosed = styled.div`
    height: 42px;
    width: 42px; 
    border-radius: 8px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.5s;

    &:hover {
        scale: 1.05;
    }
`;

const FilterButtonContainerOpened = styled.div`
    position: absolute;
    top: 21px;
    right: calc(10%);
    height: 360px;
    width: 200px; 
    border-radius: 8px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background: white;
`;

const FilterHeader = styled.div`
    height: 30px;
    width: calc(100% - 10px);
    margin-top: 10px;
    display: flex;
    justify-content: end;
`;

const FilterHeaderText = styled.div`
    width: calc(100% - 50px);
    margin-top: 3px;
`;

const CloseIconContainer = styled.div`
    height: 100%;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center; 
    cursor: pointer; 
`;


const StyledFilterAltIcon = styled(FilterAlt)`
    height: 50%;
    color: #413d3d;
`;

const FilterOption = styled.div`
    width: calc(100% - 10px);
    margin-left: 10px;
    margin-top: 20px;
    height: 30px;  
    display: flex;
    align-items: center;
    
    p {
        margin-left: 10px
    }
`;

const FilterCheckboxOption = styled.div`
    width: 100%;
    margin-top: 20px;
    margin-left: 2px;
    height: 30px;  
    display: flex;
    align-items: center;
    
    p {
      margin-left: 1px;
    
    }
`;

const StyledInput = styled.input`
    height: 100%;
    width: calc(100% - 10px);
    padding-left: 10px;
    border-radius: 8px;
    border: none;
    outline: none;
    font-size: 90%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transition: 0.5s;

    &:hover {
        scale: 1.05;
    }
`;

const StyledAddFlightButton = styled.button`
    height: 100%;
    width: calc(100% - 10px);
    border-radius: 8px;
    border: none;
    font-size: 200%;
    color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
    background: #07e207;
    font-weight: 300;
    transition: 0.5s;
    cursor: pointer;

    &:hover {
        scale: 1.05;
    }
`;

const StyledFliesList = styled.div`
      height: calc(80% - 140px);
      width: 90%;
      margin-left: calc(5% - 10px);
      overflow-y: auto;
`;