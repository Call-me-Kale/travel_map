import { useState } from "react";
import styled from "@emotion/styled";
import { ComposableMap, Geographies, Geography, Graticule, Sphere } from "react-simple-maps";

const geoUrl = "/countries.json";

export const MapChart = () => {
  const [clickedCountries, setclickedCountries] = useState<any>([]);

  const handleClick = (geo:any) => {
    let isClicked = false;
    clickedCountries.forEach((country:any) => {
        if(geo.id === country) {
            isClicked = true;
        }
    });

    if(isClicked) {
        let newClickedCountries:any = clickedCountries.filter((country:any) => country !== geo.id);
        setclickedCountries(newClickedCountries)
    } else {
        setclickedCountries([...clickedCountries, geo.id]);
    }
  };

  return (
    <MapContainer>
      <Header>
        Where have you been?
      </Header>
      <VisitedCountriesCounter>
        Visited: 13/196
      </VisitedCountriesCounter>
      <StyledComposableMap projectionConfig={{scale: 147}}>
        <Sphere stroke="#0000001a" strokeWidth={1} id="1" fill="none" />
          <Graticule stroke="#0000001a" step={[26, 29]} />
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {

                  const isClickedHandler:any = () => {
                    let isClickedCountry = false;
                    clickedCountries.forEach((country:string) => {
                        if(country === geo.id) {
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
  position: relative;
  height: 100%;
  width: 100%;
`;

const Header = styled.h1`
  height: 120px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;  
`;

const VisitedCountriesCounter = styled.h2`
  height: 60px;
  width: 100%;
  text-align: center;
`;

const StyledComposableMap = styled(ComposableMap)`
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%); 
  height: calc(100% - 180px);  
`;