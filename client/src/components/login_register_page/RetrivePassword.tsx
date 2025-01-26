import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { postForgotPassword } from "../../store/slices";
import { TextField, Button } from "@mui/material";

export const RetrivePassword = () => {
    const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [isFormError, setIsFormError] = useState<boolean>(false);
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const validationHandler = (data:string) => {

        const mailMustHaveSymbols = '@.';

        if(!mailMustHaveSymbols.split('').every(char => data.includes(char))) {
            setIsEmailValid(false)
        } else if(isEmailValid == false){
            setIsEmailValid(true)
        }
        setEmail(data);
    
    }

    const sendMailHandler = () => {
        if(isEmailValid) {
            if(isFormError) {
                setIsFormError(false);
            }
            navigate('/retrive_password_success');
            dispatch(postForgotPassword({email})) 
        } else {
            setIsFormError(true);
        }
    }

    return(
        <StyledRetrivePassword>
            <h3>Podaj Email do resetu hasła.</h3>
            <StyledTextField
                    required
                    id="outlined-required"
                    label="E-mail"
                    defaultValue=""
                    onChange={(e:any) => validationHandler(e.target.value)}
                    helperText={!isEmailValid ? "Błędny adres email" : ''}
                    error={!isEmailValid}
                />
            <StyledButton variant="contained" onClick={() => sendMailHandler()} >Wyślij</StyledButton>
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