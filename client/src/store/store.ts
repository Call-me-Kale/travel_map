import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import countryCardsSlice from "./slices/countryCardsSlice";

export const store = configureStore({
     reducer: {
        userSlice,
        countryCardsSlice
    },

    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;