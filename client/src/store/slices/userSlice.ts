import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface User {
    id: string;
    name: string;
}

interface InitialStateInterface {
    users: User[] | [];
}

const initialState: InitialStateInterface = {
    users: [],
}


const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {}

})

export default usersSlice.reducer;