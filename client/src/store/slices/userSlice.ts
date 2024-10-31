import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    name: string;
    email: string;
    isLogged: boolean;
    specialError: string;
}

interface Login {
    email: string;
    password: string;
}

interface Register {
    name: string;
    email: string;
    password: string;
}

interface InitialStateInterface {
    user: User;
}

const initialState: InitialStateInterface = {
    user: {
        name: 'Guest',
        email: 'guest@gmail.com',
        isLogged: false,
        specialError: '',
    },
}

export const postLogin = createAsyncThunk(
    "login",
    async (payload: Login, {signal}) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => {
            source.cancel();
        });

        return axios.post(`http://localhost:5150/api/UsersControllers/login`, {
            email: payload.email,
            password: payload.password
        });
        
    }
)

export const postRegister = createAsyncThunk(
    "register",
    async (payload: Register, {signal}) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => {
            source.cancel();
        });

        return axios.post(`http://localhost:5150/api/UsersControllers/register`, {
            name: payload.name,
            email: payload.email,
            password: payload.password
        }).catch(err => {
            return err;
        });
        
    }
)

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {
        logOut(state) {
            state.user.name = 'Guest';
            state.user.email = 'e@gmail.com';
            state.user.isLogged = false;
        }
    },
    extraReducers(builder) {
        builder.addCase(postLogin.fulfilled, (state, {payload}:any) => {
            if(payload.status === 200) {
                state.user.isLogged = true;
                state.user.email = payload.data.email;
                state.user.name = payload.data.name;
            }
        });
        builder.addCase(postRegister.fulfilled, (state, {payload}:any) => {
            if(payload && payload.status === 400) {
                state.user.specialError = payload.response.data;
            }
        });
    },

})

export default usersSlice.reducer;
export const { logOut } = usersSlice.actions;