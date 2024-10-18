import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface User {
    id: string;
    name: string;
    isLogged: boolean;
}

interface InitialStateInterface {
    user: User;
}

const initialState: InitialStateInterface = {
    user: {
        id: 'd23nd32ud8',
        name: 'Guest',
        isLogged: true
    },
}


const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {
        logOut(state) {
            state.user.id = 'd23nd32ud8';
            state.user.name = 'Guest';
            state.user.isLogged = false;
        }
    }

})

export default usersSlice.reducer;
export const { logOut } = usersSlice.actions;