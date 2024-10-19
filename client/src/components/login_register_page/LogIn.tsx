import { useState } from "react";
import styled from "@emotion/styled";
import { TextField, Button } from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { postLogin } from "../../store/slices";

export const LogIn = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useAppDispatch();
    const logInHandler = () => {
        dispatch(postLogin({email, password}));
    }

    return(
        <LogInContainer>
            <Header>
                <h1>Logowanie</h1>
            </Header>
            <InputsContainer>
                <StyledTextField
                    required
                    id="outlined-required"
                    label="Login"
                    defaultValue=""
                    onChange={(e:any) => setEmail(e.target.value)}
                />
                <StyledTextField
                    required
                    id="outlined-required"
                    label="Password"
                    defaultValue=""
                    onChange={(e:any) => setPassword(e.target.value)}
                />
                <StyledButton variant="contained" onClick={() => logInHandler()}>
                Zaloguj
                </StyledButton>
            </InputsContainer>
                <a>Odzyskaj hasło</a>
            <OtherContainer></OtherContainer>
        </LogInContainer>
    );
};

const LogInContainer = styled.div`
    height: 500px;
    width: 400px;

    a {
        width: 100%;
        display: flex;
        justify-content: center;
        color: #1976d2;
        text-decoration: underline;
        margin-top: 8px;
    }
`;

const Header = styled.div`
    height: 15%;
    width: 100%;
    display: grid;
    place-items: center;
    font-size: 80%;
`;

const InputsContainer = styled.div`
    height: 35%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
`;

const StyledTextField = styled(TextField)`
    width: 300px;
`;

const StyledButton = styled(Button)`
    width: 300px;  
`;

const OtherContainer = styled.div`
    height: 30%;
    width: 80%;
    margin-top: 20px;
    margin-left: 10%;
    border-top: 1px solid gray;
`;