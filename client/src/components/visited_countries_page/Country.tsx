import { FC } from "react";
import { Data } from "./CountriesList";
import styled from "@emotion/styled";

interface DataI {
    data: Data
}

export const Country:FC<DataI> = ({data}) => {
    const {name, img, description} = data;
    return (
        <StyledCountry>
            <ImageContainer></ImageContainer>
            <CountryNameContainer>{name}</CountryNameContainer>
            <DescriptionContainer><p>{description}</p></DescriptionContainer>
        </StyledCountry>
    );
};

const StyledCountry = styled.div`
    height: 400px;
    width: 300px;
    background: gray;
    margin: 15px 20px;
    border-radius: 20px;
    cursor: pointer;
`;

const ImageContainer = styled.div`
    height: 50%;
    width: 100%;
    background: black;  
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
`;

const CountryNameContainer = styled.h3`
    height: 10%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;  
`;

const DescriptionContainer = styled.div`
    height: 40%;
    width: 100%;
    background: yellow;  
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    p {
        height: 80%;
        width: 80%;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 5; 
                line-clamp: 5;
        -webkit-box-orient: vertical;
    }
`;