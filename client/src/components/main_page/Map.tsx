import { useState } from "react";
import styled from "@emotion/styled";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "/countries.json";

export const MapChart = () => {
  const [clickedCountries, setclickedCountries] = useState<any>([]);

  const handleClick = (geo:any) => {
    let isClicked = false;
    clickedCountries.forEach((country:any) => {
        if(geo.properties.name === country) {
            isClicked = true;
        }
    });

    if(isClicked) {
        let newClickedCountries:any = clickedCountries.filter((country:any) => country !== geo.properties.name);
        setclickedCountries(newClickedCountries)
    } else {
        setclickedCountries([...clickedCountries, geo.properties.name]);
    }
  };

  return (
    <MapContainer>
      <Header>
        Where have you been?
      </Header>
      <StyledComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {

              const isClickedHandler:any = () => {
                let isClickedCountry = false;
                clickedCountries.forEach((country:string) => {
                    if(country === geo.properties.name) {
                        isClickedCountry = true;
                    }
                })
                return isClickedCountry;
                
              };
              let isClicked = false;

              if(clickedCountries[0] !== undefined) {
                isClicked = isClickedHandler();
              }
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleClick(geo)}
                  fill={isClicked ? "#57c9f2" : "#D6D6DA"}
                  style={{
                    default: {
                      stroke: "#FFFFFF",
                      outline: "none",
                    },
                    hover: {
                      fill: "#57c9f2",
                      stroke: "#FFFFFF",
                      outline: "none",
                    },
                    pressed: {
                        outline: 'none'
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </StyledComposableMap>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Header = styled.h1`
  height: 120px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;  
`;

const StyledComposableMap = styled(ComposableMap)`
    height: 70%;  
    margin-bottom: calc(30% - 120px);
`;