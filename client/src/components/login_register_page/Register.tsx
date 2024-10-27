import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { postRegister } from "../../store/slices";
import styled from "@emotion/styled";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const Register = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showRetryPassword, setShowRetryPassword] = useState<boolean>(false);
    const [retryPassword, setRetryPassword] = useState<string>('');
    const [errors ,setErrors] = useState({
        nameError: false,
        emailError: false,
        passwordError: false,
        retryPasswordError: false,
        registerError: false
    });

    const [errorsActiveLabels ,setErrorsActiveLabels] = useState({
        nameErrorLabel: 'Error',
        emailErrorLabel: 'Error',
        passwordErrorLabel: 'Error',
        retryPasswordErrorLabel: 'Error',
        registerErrorLabel: 'Error'
    });

    const textFieldIds = {
        name: errors.nameError ? 'outlined-error-helper-text' : 'outlined-required',
    }

    const dispatch = useAppDispatch();

    const registerHandler = () => {
        if((password === '') || (email === '') || (name === '') || (retryPassword === '')) {
            setErrors({
                nameError: name === '' ? true : false,
                emailError: email === '' ? true : false,
                passwordError: password === '' ? true : false,
                retryPasswordError: retryPassword === '' ? true : false,
                registerError: true
            });

            setErrorsActiveLabels({
                nameErrorLabel: name === '' ? 'Nazwa powinna zawierać od 8 do 32 znaków' : '',
                emailErrorLabel: email === '' ? 'Błędny adres e-mail' : '',
                passwordErrorLabel: password === '' ? 'Hasło powinno zawierać od 8 do 32 znaków' : '',
                retryPasswordErrorLabel: retryPassword === '' ? 'Hasła nie są takie same' : '',
                registerErrorLabel: 'Błędnie wprowadzono dane'
            })
        } else if(!errors.nameError && !errors.emailError && !errors.passwordError && !errors.retryPasswordError && !errors.registerError ) {
            dispatch(postRegister({name, email, password}));
        } else {
            setErrors({
                ...errors,
                registerError: true
            });
            setErrorsActiveLabels({
                ...errorsActiveLabels,
                registerErrorLabel: 'Błędnie wprowadzono dane'
            })
        }
    }

    const validationHandler = (type: string, data:string) => {

        const allowedChars: string = 'QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuiopasdfghjklzxcvbnm€?/|[]{}-=_+1234567890!@#$%^&*()';
        const mailMustHaveSymbols = '@.';
        const min_length: number = 8;
        const max_length: number = 32;

        switch(type) {
            case 'name':
                if((data.length + 1) <= min_length || data.length >= max_length) {
                    setErrors({
                        ...errors,
                        nameError: true
                    });
                    setErrorsActiveLabels({
                        ...errorsActiveLabels,
                        nameErrorLabel: 'Nazwa powinna zawierać od 8 do 32 znaków'
                    });
                } else if(data.split('').some(char => !allowedChars.includes(char))) {
                    setErrors({
                        ...errors,
                        nameError: true
                    });
                    setErrorsActiveLabels({
                        ...errorsActiveLabels,
                        nameErrorLabel: 'Nazwa zawiera niedozwolone znaki'
                    });
                } else if(errors.nameError){
                    setErrors({
                        ...errors,
                        nameError: false
                    });
                }
                setName(data);
                break;
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
            case 'retryPassword':
                if(password !== data) {
                    setErrors({
                        ...errors,
                        retryPasswordError: true
                    });

                    setErrorsActiveLabels({
                        ...errorsActiveLabels,
                        retryPasswordErrorLabel: 'Hasła nie są takie same'
                    });

                } else if(errors.retryPasswordError) {
                    setErrors({
                        ...errors,
                        retryPasswordError: false
                    });
                }
                setRetryPassword(data);
                break;
            default:
                break;
        }
    }

    const toggleShowPassword = (type:string) => {
        if(type === 'password') {
            setShowPassword(!showPassword);
        } else if (type === 'retryPassword') {
            setShowRetryPassword(!showRetryPassword)
        }
        
    };

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
                                <IconButton onClick={() => toggleShowPassword('password')}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <StyledTextField
                    required
                    id="outlined-required"
                    type={showRetryPassword ? "text" : "password"}
                    autoComplete="off"
                    label="Powtórz hasło"
                    defaultValue=""
                    onChange={(e:any) => validationHandler('retryPassword', e.target.value)}
                    helperText={errors.retryPasswordError ? errorsActiveLabels.retryPasswordErrorLabel : ''}
                    error={errors.retryPasswordError}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => toggleShowPassword('retryPassword')}>
                                    {showRetryPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <StyledButton variant="contained" onClick={() => registerHandler()}>
                Stwórz
                </StyledButton>
                {
                errors.registerError && 
                <StyledErrorText>{errorsActiveLabels.registerErrorLabel}</StyledErrorText>
                }
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

const StyledErrorText = styled.p`
    font-size: 12px;
    color: #d32f2f;
`;