import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const RetrivePasswordSuccess = () => {
    const navigate = useNavigate();

    const redirectHandler = () => {
        navigate('/login');
    }

    return(
        <StyledRetriveSuccess>
            <h2>Wysłano!</h2>
            <h4>Sprawdź swoją skrzynkę pocztową.</h4>
            <ButtonContainer>
                <Button onClick={() => redirectHandler()} variant="contained">Powrót</Button>
            </ButtonContainer>
        </StyledRetriveSuccess>
    );
};

const StyledRetriveSuccess = styled.div`
    height: 800px;
    width: 400px;
    margin-top: 200px;

    h2 {
        width: 400px;
        display: flex;
        justify-content: center;
    }

    h4 {
        width: 400px;
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
        
    }
`;


const ButtonContainer = styled.div`
    width: 400px;
    display: flex;
    justify-content: center;
`;