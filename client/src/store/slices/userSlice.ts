import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    isAuthenticated: boolean;
    token: string;
    specialError: string;
    registrationStatus: string;
}

interface Login {
    email: string;
    password: string;
}

interface LoginByToken {
    token: string;
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
        isAuthenticated: false,
        token: '',
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

export const postLoginByToken = createAsyncThunk(
    "loginByToken",
    async (payload: LoginByToken, {signal}) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => {
            source.cancel();
        });

        return axios.post(`http://localhost:5150/api/UsersControllers/login_by_token`, {
            token: payload.token
        }).catch(err => err);
        
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
            state.user.token = '';
            state.user.isAuthenticated = false;
            sessionStorage.removeItem('token');
        },

        changeRegistrationStatus(state) {
            state.user.registrationStatus = '';
        }
    },
    extraReducers(builder) {
        builder.addCase(postLogin.fulfilled, (state, {payload}:any) => {
            if(payload.status === 200) {
                state.user.isAuthenticated = true;
                state.user.token = payload.data.token;
                sessionStorage.setItem("token", payload.data.token);
            }
        });
        builder.addCase(postLoginByToken.fulfilled, (state, {payload}: any) => {
            state.user.isAuthenticated = true;
            state.user.token = payload.data.token;
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