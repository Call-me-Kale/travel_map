import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    userData: any;
    isAuthenticated: boolean;
    specialError: string;
    registrationStatus: string;
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

interface ForgotPassword {
    email: string
}

interface NewPassword {
    token: string,
    new_password: string
}

interface InitialStateInterface {
    user: User;
}

const initialState: InitialStateInterface = {
    user: {
        userData: {},
        isAuthenticated: false,
        specialError: '',
        registrationStatus: ''
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
);


export const postForgotPassword = createAsyncThunk(
    "forgotPassword",
    async (payload: ForgotPassword, {signal}) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => {
            source.cancel();
        });

        return axios.post(`http://localhost:5150/api/UsersControllers/forgot_password`, {
            email: payload.email,
        }).catch(err => {
            return err;
        });
    }
);

export const postNewPassword = createAsyncThunk(
    "newPassword",
    async (payload: NewPassword, {signal}) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => {
            source.cancel();
        });
        console.log(payload.token)
        console.log(payload.new_password)
        return axios.post(`http://localhost:5150/api/UsersControllers/reset_password`, {
            token: payload.token,
            newPassword: payload.new_password
        }).catch(err => {
            return err;
        });
    }
);

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {
        logOut(state) {
            state.user.userData = {};
            state.user.isAuthenticated = false;
        },

        changeRegistrationStatus(state) {
            state.user.registrationStatus = '';
        }
    },
    extraReducers(builder) {
        builder.addCase(postLogin.fulfilled, (state, {payload}:any) => {
            if(payload.status === 200) {
                state.user.isAuthenticated = true;
                state.user.userData = payload.data.userData;
                sessionStorage.setItem("token", payload.data.token);
            }
        });
        builder.addCase(postRegister.fulfilled, (state, {payload}:any) => {
            if(payload && payload.status === 400) {
                state.user.specialError = payload.response.data;
                state.user.registrationStatus = 'failed';
            } else if (payload.status === 201) {
                state.user.registrationStatus = 'succeeded';
            }
        });
        builder.addCase(postForgotPassword.fulfilled, (state, {payload}:any) => {
            if(payload && payload.status === 400) {
                state.user.specialError = payload.response.data;
                //state.user.registrationStatus = 'failed';
            } else if (payload.status === 201) {
                //state.user.registrationStatus = 'succeeded';
            }
        });
        builder.addCase(postNewPassword.fulfilled, (state, {payload}:any) => {
            if(payload && payload.status === 400) {
                state.user.specialError = payload.response.data;
                //state.user.registrationStatus = 'failed';
            } else if (payload.status === 201) {
                //state.user.registrationStatus = 'succeeded';
            }
        });
    },

})

export default usersSlice.reducer;
export const { logOut, changeRegistrationStatus } = usersSlice.actions;