import { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { postNewPassword } from "../../store/slices";


export const ResetPassword = () => {
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
    const [newPassword, setNewPassword] = useState<string>('');
    const [passwordErrorLabel, setPasswordErrorLabel] = useState<string>('');
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isFormError, setIsFormError] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    
    const validationHandler = (data:string) => {

        const allowedChars: string = 'QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuiopasdfghjklzxcvbnm€?/|[]{}-=_+1234567890!@#$%^&*()';
        const min_length: number = 8;
        const max_length: number = 32;


        if((data.length + 1) <= min_length || data.length >= max_length) {
            setIsPasswordValid(false);
            setPasswordErrorLabel('Hasło powinna zawierać od 8 do 32 znaków');
        } else if(data.split('').some(char => !allowedChars.includes(char))) {
            setIsPasswordValid(false);
            setPasswordErrorLabel('Hasło zawiera niedozwolone znaki');
        } else if(!isPasswordValid){
            setIsPasswordValid(true);
        }
        setNewPassword(data);
    }

    const sendNewPasswordHandler = () => {
        if(isPasswordValid && token) {
            dispatch(postNewPassword({token: token, new_password: newPassword}))
            navigate('/login');
        } else {
            setIsFormError(true);
        }
    }

    return(
        <StyledRetrivePassword>
            <h3>Podaj Nowe hasło.</h3>
            <StyledTextField
                    required
                    id="outlined-required"
                    type={isPasswordVisible ? "text" : "password"}
                    autoComplete="new-password"
                    label="Hasło"
                    defaultValue=""
                    onChange={(e:any) => validationHandler(e.target.value)}
                    helperText={!isPasswordValid ? passwordErrorLabel : ''}
                    error={!isPasswordValid}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            <StyledButton variant="contained" onClick={() => sendNewPasswordHandler()} >Wyślij</StyledButton>
            {isFormError && <StyledP>Wystąpił błąd.</StyledP>}
        </StyledRetrivePassword>
    );
};


const StyledRetrivePassword = styled.div`
    height: 800px;
    width: 400px;
    margin-top: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const StyledTextField = styled(TextField)`
    width: 300px;
    margin: 16px 0;
`;

const StyledButton = styled(Button)`
    width: 300px;  
`;

const StyledP = styled.p `
    width: 300px;
    display: flex;
    justify-content: center;
    color: #d32f2f;
    font-weight: 400;
    font-size: 0.75rem;
    margin-top: 3px;
`;