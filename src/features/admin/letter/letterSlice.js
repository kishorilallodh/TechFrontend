import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import letterService from './letterService';

const initialState = {
    letters: [],
    users: [], // To store the list of users for the admin form
    status: 'idle',
    error: null,
};

// --- THUNKS ---
export const createOfferLetter = createAsyncThunk('letters/createOffer', async (letterData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await letterService.createOfferLetter(letterData, token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const createExperienceLetter = createAsyncThunk('letters/createExperience', async (letterData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await letterService.createExperienceLetter(letterData, token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const fetchAllUsers = createAsyncThunk('letters/fetchAllUsers', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await letterService.getAllUsers(token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});


export const fetchUserLetters = createAsyncThunk('letters/fetchUser', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await letterService.getUserLetters(token);
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});
// ... you can add a fetchUserLetters thunk later for the user dashboard

export const letterSlice = createSlice({
    name: 'letters',
    initialState,
    reducers: {
        reset: (state) => {
            state.status = 'idle';
            state.error = null;
        },
         // It might be good to have a full reset for when a user logs out
        resetLetters: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(fetchUserLetters.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserLetters.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.letters = action.payload; // Store the fetched letters
            })
            .addCase(fetchUserLetters.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addMatcher(
                (action) => action.type.startsWith('letters/create'),
                (state) => { state.status = 'loading'; }
            )
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled') && action.type.startsWith('letters/create'),
                (state) => { state.status = 'succeeded'; }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload;
                }
            );
    },
});

export const { reset, resetLetters } = letterSlice.actions;
export default letterSlice.reducer;