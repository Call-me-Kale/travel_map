import styled from "@emotion/styled";
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
            from: '',
            to: '',
            duration: '',
        },
        {
            flynumber: '',
            from: '',
            to: '',
            duration: '',
        },
        {
            flynumber: '',
            from: '',
            to: '',
            duration: '',
        },
        {
            flynumber: '',
            from: '',
            to: '',
            duration: '',
        },
        {
            flynumber: '',
            from: '',
            to: '',
            duration: '',
        },
        {
            flynumber: '',
            from: '',
            to: '',
            duration: '',
        },
        {
            flynumber: '',
            from: '',
            to: '',
            duration: '',
        },
        {
            flynumber: '',
            from: '',
            to: '',
            duration: '',
        },
        {
            flynumber: '',
            from: '',
            to: '',
            duration: '',
        },
        {
            flynumber: '',
            from: '',
            to: '',
            duration: '',
        },
        {
            flynumber: '',
            from: '',
            to: '',
            duration: '',
        },
    ] 

    return(
        <>
            <Header>Twoje Loty</Header>
            <ListHeader>
                <SearchInputContainer>
                    <StyledInput type="text" placeholder="search..." />
                </SearchInputContainer>
            </ListHeader>
            <StyledFliesList>
                {
                    tempdata[0] && tempdata.map((data:any) => {
                        return <Fly data={data}/>
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
    height: 10%;
    width: 95%;
    margin-left: 5%;
    margin-top: 5%;
    display: flex;
    align-items: center;
`;

const SearchInputContainer = styled.div`
    height: 50%;
    width: 220px;
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

`;

const StyledFliesList = styled.div`
      height: calc(80% - 140px);
      width: 90%;
      margin-left: calc(5% - 10px);
      overflow-y: auto;
`;