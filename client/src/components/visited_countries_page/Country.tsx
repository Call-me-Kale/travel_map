import { FC } from "react";
import { Data } from "./CountriesList";
import styled from "@emotion/styled";
const polandIMG = require('./img/poland.jpeg');
const italyIMG = require('./img/italy.jpg');
const japanIMG = require('./img/japan.jpeg');

interface DataI {
    data: Data
}

export const Country:FC<DataI> = ({data}) => {
    const {name, img, description} = data;
    return (
        <StyledCountry>
            <ImageContainer src={img === './img/japan.jpeg' ? japanIMG : polandIMG} alt="country image" />
            <CountryNameContainer>{name}</CountryNameContainer>
            <DescriptionContainer><p>{description}</p></DescriptionContainer>
        </StyledCountry>
    );
};

const StyledCountry = styled.div`
    height: 400px;
    width: 300px;
    margin: 15px 20px;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const ImageContainer = styled.img`
    height: 50%;
    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;

const CountryNameContainer = styled.h3`
    height: 10%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center; 
    font-size: 130%; 
`;

const DescriptionContainer = styled.div`
    height: 40%;
    width: 100%;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    p {
        margin-bottom: 10%;
        height: 60%;
        width: 80%;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 4; 
                line-clamp: 4;
        -webkit-box-orient: vertical;
    }
`;