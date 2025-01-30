import { useEffect } from "react";
import styled from "@emotion/styled";
import { CountriesList } from "../components/visited_countries_page";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCountries, getUserCards } from "../store/slices/countryCardsSlice";


export const VisitedCoutriesPage = () => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.userSlice.user.userData.id);

    useEffect(() => {
        dispatch(getCountries());
        dispatch(getUserCards(userId));
    },[]);

    return(
        <StyledVisitedCoutriesPage>
            <CountriesList />
        </StyledVisitedCoutriesPage>
    );
};

const StyledVisitedCoutriesPage = styled.div`
    height: 100%;
    width: calc(100% - 280px);

    @media screen and (max-width: 1100px) {
        height: calc(100% - 100px);
        width: 100%;
    }
`;