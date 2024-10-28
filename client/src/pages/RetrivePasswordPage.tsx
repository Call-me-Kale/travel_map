import { useState } from "react";
import styled from "@emotion/styled";
import { RetrivePasswordStep1, RetrivePasswordStep2, RetrivePasswordStep3 } from "../components/login_register_page";

export const RetrivePasswordPage = () => {
    const [step, setStep] = useState<number>(1);

    return(
        <StyledRetrivePasswordPage>
            {step === 1 && <RetrivePasswordStep1 />}
            {step === 2 && <RetrivePasswordStep2 />}
            {step === 3 && <RetrivePasswordStep3 />}
        </StyledRetrivePasswordPage>
    );
};

const StyledRetrivePasswordPage = styled.div`
    
`;