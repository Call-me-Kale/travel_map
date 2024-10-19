import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    id: number;
    name: string;
    password: string;
    email: string;
    isLogged: boolean;
}

interface Login {
    email: string;
    password: string;
}

interface InitialStateInterface {
    user: User;
}

const initialState: InitialStateInterface = {
    user: {
        id: 0,
        name: 'Guest',
        password: 'admin',
        email: 'guest@gmail.com',
        isLogged: false
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
    async (payload: Login, {signal}) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => {
            source.cancel();
        });

        return axios.post(`http://localhost:5150/api/UsersControllers/register`, {
            email: payload.email,
            password: payload.password
        });
        
    }
)

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {
        logOut(state) {
            state.user.id = 0;
            state.user.name = 'Guest';
            state.user.password = 'admin';
            state.user.email = 'e@gmail.com';
            state.user.isLogged = false;
        }
    },
    extraReducers(builder) {
        builder.addCase(postLogin.fulfilled, (state, {payload}:any) => {
            state.user.isLogged = true;
            console.log(payload);
        }),
        builder.addCase(postRegister.fulfilled, (state, {payload}:any) => {
            
        })
    },

})

export default usersSlice.reducer;
export const { logOut } = usersSlice.actions;