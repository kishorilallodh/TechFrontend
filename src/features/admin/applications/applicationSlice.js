import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import applicationApiService from "./applicationApiService";

const initialState = { applications: [], status: 'idle', error: null };
const getToken = (thunkAPI) => thunkAPI.getState().auth.user.token;

export const fetchApplications = createAsyncThunk('applications/fetchAll', async (_, thunkAPI) => {
    try { return await applicationApiService.getAllApplications(getToken(thunkAPI)); }
    catch (e) { return thunkAPI.rejectWithValue(e.response.data.message); }
});


export const changeApplicationStatus = createAsyncThunk('applications/updateStatus', async ({ id, status }, thunkAPI) => {
    try { return await applicationApiService.updateStatus({ id, status }, getToken(thunkAPI)); }
    catch (e) { return thunkAPI.rejectWithValue(e.response.data.message); }
});

export const removeApplication = createAsyncThunk('applications/delete', async (id, thunkAPI) => {
    try { await applicationApiService.deleteApplication(id, getToken(thunkAPI)); return id; }
    catch (e) { return thunkAPI.rejectWithValue(e.response.data.message); }
});

const applicationSlice = createSlice({
    name: 'adminApplications',
    initialState,
    reducers: { reset: (state) => { state.status = 'idle'; state.error = null; } },
    extraReducers: builder => {
        builder
            .addCase(fetchApplications.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchApplications.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.applications = action.payload;
            })
            .addCase(fetchApplications.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
             .addCase(changeApplicationStatus.fulfilled, (state, action) => {
            const index = state.applications.findIndex(app => app._id === action.payload._id);
            if (index !== -1) {
                state.applications[index] = action.payload;
            }
        })
        .addCase(removeApplication.fulfilled, (state, action) => {
            state.applications = state.applications.filter(app => app._id !== action.payload);
        })

    }
});

export const { reset } = applicationSlice.actions;
export default applicationSlice.reducer;