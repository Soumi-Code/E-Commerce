import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Retrieve user info and token from localStorage
const userFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

// Check for an existing guest ID in localStorage or generate a new one
const initialGuestID = localStorage.getItem('guestID') || `guest_${new Date().getTime()}`;
localStorage.setItem('guestID', initialGuestID);

// Initial state for the auth slice
const initialState = {
    user: userFromStorage,
    guestID: initialGuestID,
    loading: false,
    error: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData);
        localStorage.setItem('userInfo', JSON.stringify(response.data.user));
        localStorage.setItem('userToken', response.data.token);

        return response.data.user;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk for user registration
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, userData);
        localStorage.setItem('userInfo', JSON.stringify(response.data.user));
        localStorage.setItem('userToken', response.data.token);

        return response.data.user;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.guestID = `guest_${new Date().getTime()}`;
            localStorage.removeItem('userInfo');
            localStorage.removeItem('userToken');
            localStorage.setItem('guestID', state.guestID);
        },
        generateNewGuestID: (state) => {
            state.guestID = `guest_${new Date().getTime()}`;
            localStorage.setItem('guestID', state.guestID);
    },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    }
});

export const { logout, generateNewGuestID } = authSlice.actions;

export default authSlice.reducer;