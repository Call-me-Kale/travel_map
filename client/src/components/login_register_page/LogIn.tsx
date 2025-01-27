import { useState } from "react";
import styled from "@emotion/styled";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { postLogin } from "../../store/slices";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errors ,setErrors] = useState({
        emailError: false,
        passwordError: false,
        loginError: false
    });

    const [errorsActiveLabels ,setErrorsActiveLabels] = useState({
        emailErrorLabel: 'Error',
        passwordErrorLabel: 'Error',
        loginErrorLabel: 'Error'
    });

    const navigate = useNavigate();


    const validationHandler = (type: string, data:string) => {

        const allowedChars: string = 'QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuiopasdfghjklzxcvbnm€?/|[]{}-=_+1234567890!@#$%^&*()';
        const mailMustHaveSymbols = '@.';
        const min_length: number = 8;
        const max_length: number = 32;

        switch(type) {
            case 'email':
                if(!mailMustHaveSymbols.split('').every(char => data.includes(char))) {
                    setErrors({
                        ...errors,
                        emailError: true
                    });
                    setErrorsActiveLabels({
                        ...errorsActiveLabels,
                        emailErrorLabel: 'Błędny adres e-mail'
                    });
                } else if(errors.emailError){
                    setErrors({
                        ...errors,
                        emailError: false
                    });
                }
                setEmail(data);
                break;
            case 'password':
                if((data.length + 1) <= min_length || data.length >= max_length) {
                    setErrors({
                        ...errors,
                        passwordError: true
                    });
                    setErrorsActiveLabels({
                        ...errorsActiveLabels,
                        passwordErrorLabel: 'Hasło powinna zawierać od 8 do 32 znaków'
                    });
                } else if(data.split('').some(char => !allowedChars.includes(char))) {
                    setErrors({
                        ...errors,
                        passwordError: true
                    });
                    setErrorsActiveLabels({
                        ...errorsActiveLabels,
                        passwordErrorLabel: 'Hasło zawiera niedozwolone znaki'
                    });
                } else if(errors.passwordError){
                    setErrors({
                        ...errors,
                        passwordError: false
                    });
                }
                setPassword(data);
                break;
            default:
                break;
        }
    }

    const dispatch = useAppDispatch();
    const logInHandler = () => {
        if((password === '') || (email === '')) {
            setErrors({
                emailError: email === '' ? true : false,
                passwordError: password === '' ? true : false,
                loginError: true
            });

            setErrorsActiveLabels({
                emailErrorLabel: email === '' ? 'Błędny adres e-mail' : '',
                passwordErrorLabel: password === '' ? 'Hasło powinno zawierać od 8 do 32 znaków' : '',
                loginErrorLabel: 'Błędnie wprowadzono dane'
            })
        } else if(!errors.emailError && !errors.passwordError) {
            dispatch(postLogin({email, password}));
        } else {
            setErrors({
                ...errors,
                loginError: true
            });
            setErrorsActiveLabels({
                ...errorsActiveLabels,
                loginErrorLabel: 'Błędnie wprowadzono dane'
            })
        }
        
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
                    label="E-mail"
                    defaultValue=""
                    onChange={(e:any) => validationHandler('email', e.target.value)}
                    helperText={errors.emailError ? errorsActiveLabels.emailErrorLabel : ''}
                    error={errors.emailError}
                />
                <StyledTextField
                    required
                    id="outlined-required"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    label="Hasło"
                    defaultValue=""
                    onChange={(e:any) => validationHandler('password', e.target.value)}
                    helperText={errors.passwordError ? errorsActiveLabels.passwordErrorLabel : ''}
                    error={errors.passwordError}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <StyledButton variant="contained" onClick={() => logInHandler()}>
                Zaloguj
                </StyledButton>
                {
                errors.loginError && 
                <StyledErrorText>Błędnie wprowadzono dane</StyledErrorText>
                }
                
            </InputsContainer>
            <AnchorTagContainer>
                <a onClick={() => navigate('/retrive_password')}>Odzyskaj hasło</a>
                <a href="/register">Zarejestruj się</a>
            </AnchorTagContainer>
            <OtherContainer></OtherContainer>
        </LogInContainer>
    );
};

const LogInContainer = styled.div`
    height: 610px;
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

const AnchorTagContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        color: #1976d2;
        text-decoration: underline;
        margin-top: 8px;
        cursor: pointer;
    }
`;

const StyledErrorText = styled.p`
    font-size: 12px;
    color: #d32f2f;
`;