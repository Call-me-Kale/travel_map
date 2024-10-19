import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { postRegister } from "../../store/slices";
import styled from "@emotion/styled";
import { TextField, Button } from "@mui/material";

export const Register = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [retryPassword, setRetryPassword] = useState<string>('');

    const dispatch = useAppDispatch();

    const registerHandler = () => {
        if(password === retryPassword) {
            dispatch(postRegister({email, password}))
        }
    }

    return(
        <RegisterContainer>
            <Header>
                <h1>Rejestracja</h1>
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
                <StyledTextField
                    required
                    id="outlined-required"
                    label="Retry password"
                    defaultValue=""
                    onChange={(e:any) => setRetryPassword(e.target.value)}
                />
                <StyledButton variant="contained" onClick={() => registerHandler()}>
                Stwórz
                </StyledButton>
            </InputsContainer>
            <OtherContainer></OtherContainer>
        </RegisterContainer>
    );
};

const RegisterContainer = styled.div`
    height: 500px;
    width: 400px;
`;

const Header = styled.div`
    height: 15%;
    width: 100%;
    display: grid;
    place-items: center;
    font-size: 80%;
`;

const InputsContainer = styled.div`
    height: 55%;
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