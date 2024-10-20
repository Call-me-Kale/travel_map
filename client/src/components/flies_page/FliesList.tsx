import styled from "@emotion/styled";
import { Fly } from "./Fly";

export const FliesList = () => {
    const tempdata = [
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
            <ListHeader></ListHeader>
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

const ListHeader = styled.div`
    height:10%;
    width: 90%;
    margin-left: 5%;
    margin-top: 5%;
    border-bottom: 1px solid black;  
    background: #e2e0e0;
`;

const StyledFliesList = styled.div`
      height: 80%;
      width: 90%;
      margin-left: 5%;
      background: #e2e0e0;
      overflow-y: auto;
        overflow-x: hidden;
`;