import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { postRegister } from "../../store/slices";
import styled from "@emotion/styled";
import { TextField, Button } from "@mui/material";

export const Register = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [retryPassword, setRetryPassword] = useState<string>('');
    const [errors ,setErrors] = useState({
        nameError: false,
        emailError: false,
        passwordError: false,
        retryPasswordError: false
    });

    const [errorsActiveLabels ,setErrorsActiveLabels] = useState({
        nameErrorLabel: 'Error',
        emailErrorLabel: 'Error',
        passwordErrorLabel: 'Error',
        retryPasswordErrorLabel: 'Error'
    });

    const textFieldIds = {
        name: errors.nameError ? 'outlined-error-helper-text' : 'outlined-required',
    }

    const dispatch = useAppDispatch();

    const registerHandler = () => {
        if(password === retryPassword) {
            dispatch(postRegister({name, email, password}))
        }
    }

    const validationHandler = (type: string, data:string) => {

        const allowedChars: string = 'QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuiopasdfghjklzxcvbnm€<>?/.,;\\:|[]{}-=_+1234567890!@#$%^&*()';
        const min_length: number = 8;
        const max_length: number = 32;

        switch(type) {
            case 'name':
                if((name.length + 1) <= min_length || name.length >= max_length) {
                    setErrors({
                        ...errors,
                        nameError: true
                    });
                    setErrorsActiveLabels({
                        ...errorsActiveLabels,
                        nameErrorLabel: 'Nazwa powinna zawierać od 8 do 32 znaków'
                    });
                    console.log(errors);
                } else if(data.split('').some(char => !allowedChars.includes(char))) {
                    setErrors({
                        ...errors,
                        nameError: true
                    });
                    setErrorsActiveLabels({
                        ...errorsActiveLabels,
                        nameErrorLabel: 'Nazwa zawiera niedozwolone znaki'
                    });
                    console.log('123');
                } else if(errors.nameError){
                    setErrors({
                        ...errors,
                        nameError: false
                    });
                }
                setName(data);
                break;
            case 'email':
                setEmail(data);
                break;
            case 'password':
                setPassword(data);
                break;
            case 'retryPassword':
                setRetryPassword(data);
                break;
            default:
                break;
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
                    id={textFieldIds.name}
                    label="Nazwa"
                    defaultValue=""
                    onChange={(e:any) => validationHandler('name', e.target.value)}
                    helperText={errors.nameError ? errorsActiveLabels.nameErrorLabel : ''}
                    error={errors.nameError}
                />
                <StyledTextField
                    required
                    id="outlined-required"
                    label="E-mail"
                    defaultValue=""
                    onChange={(e:any) => validationHandler('email', e.target.value)}
                />
                <StyledTextField
                    required
                    id="outlined-required"
                    label="Hasło"
                    defaultValue=""
                    onChange={(e:any) => validationHandler('password', e.target.value)}
                />
                <StyledTextField
                    required
                    id="outlined-required"
                    label="Powtórz hasło"
                    defaultValue=""
                    onChange={(e:any) => validationHandler('retryPassword', e.target.value)}
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
    margin-top: 100px;
`;

const Header = styled.div`
    height: 15%;
    width: 100%;
    display: grid;
    place-items: center;
    font-size: 80%;
`;

const InputsContainer = styled.div`
    height: 350px;
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