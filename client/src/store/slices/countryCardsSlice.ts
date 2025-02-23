import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface Country {
    name_pl: string;
    name_en: string;
    code: string;
} 

export interface CountryCard {
    id: number;
    userId: number;
    cardDescription: string;
    countryName: string;
}

interface CreateCountryCard {
    userId: number;
    cardDescription: string;
    countryCode: string;
    countryName: string;
}

export interface CountryCards {
    countries: Country[] | [];
    countryCards: CountryCard[] | [];
    lastOpenedCountryCard: CountryCard | {};
}

const initialState: CountryCards = {
    countries: [],
    countryCards: [],
    lastOpenedCountryCard: {}
}

export const getUserCards = createAsyncThunk(
    "getUserCards",
    async (payload: number, {signal}) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => {
            source.cancel();
        });

        return axios.get(`http://localhost:5150/api/Countries/user_cards/${payload}`);
    }
);

export const getCountries = createAsyncThunk(
    "getCountries",
    async (payload, {signal}) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => {
            source.cancel();
        });

        return axios.get(`http://localhost:5150/api/Countries`);
    }
);

export const postCountryCard = createAsyncThunk(
    "postCountryCard",
    async (payload: CreateCountryCard, {signal}) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => {
            source.cancel();
        });

        return axios.post(`http://localhost:5150/api/Countries/create`, {
            userId: payload.userId,
            countryCode: payload.countryCode,
            countryName: payload.countryName,
            description: payload.cardDescription
        });
        
    }
)



const countryCardsSlice = createSlice({
    name: 'countryCardsSlice',
    initialState,
    reducers: {
        changeLastOpenedCountryCard(state, action) {
            state.lastOpenedCountryCard = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(getCountries.fulfilled, (state, {payload}:any) => {
            if(payload.status === 200) {
                state.countries = payload.data;
            }
        });
        builder.addCase(getUserCards.fulfilled, (state, {payload}:any) => {
            if(payload.status === 200) {
                state.countryCards = payload.data;
            }
        });

        builder.addCase(postCountryCard.fulfilled, (state, {payload}:any) => {
            if(payload.status === 200) {
                
            }
        });
    },

})

export default countryCardsSlice.reducer;
export const { changeLastOpenedCountryCard } = countryCardsSlice.actions;