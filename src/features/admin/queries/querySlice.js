import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import queryApiService from "./queryApiService";

const initialState = {
    queries: [],
    status: 'idle',
    error: null,
};

// Helper to get token from state
const getToken = (thunkAPI) => thunkAPI.getState().auth.user.token;

// Async Thunks
export const fetchQueries = createAsyncThunk('queries/fetchAll', async (_, thunkAPI) => {
    try {
        return await queryApiService.getAllQueries(getToken(thunkAPI));
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const sendReply = createAsyncThunk('queries/sendReply', async ({ id, replyMessage }, thunkAPI) => {
    try {
        await queryApiService.replyToQuery({ id, replyMessage }, getToken(thunkAPI));
        return id; // Return the ID of the replied query to update its status
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const removeQuery = createAsyncThunk('queries/remove', async (id, thunkAPI) => {
    try {
        await queryApiService.deleteQuery(id, getToken(thunkAPI));
        return id; // Return the ID of the deleted query
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const querySlice = createSlice({
    name: 'adminQueries',
    initialState,
    reducers: {
        reset: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fulfilled cases
            .addCase(fetchQueries.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.queries = action.payload;
            })
            .addCase(sendReply.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.queries.findIndex(q => q._id === action.payload);
                if (index !== -1) {
                    state.queries[index].status = 'Replied'; // Status ko manually update karein
                }
            })
            .addCase(removeQuery.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.queries = state.queries.filter(q => q._id !== action.payload);
            })
            // Generic Pending/Rejected cases
            .addMatcher(
                (action) => action.type.startsWith('queries/') && action.type.endsWith('/pending'),
                (state) => { state.status = 'loading'; }
            )
            .addMatcher(
                (action) => action.type.startsWith('queries/') && action.type.endsWith('/rejected'),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload;
                }
            );
    }
});

export const { reset } = querySlice.actions;
export default querySlice.reducer;