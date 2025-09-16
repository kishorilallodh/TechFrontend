import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAttendanceApiService from "./adminAttendanceApiService";

const initialState = {
    todaysRecords: [],
    employeeHistory: [],
    summary: null,
    status: 'idle',
    error: null,
};

export const fetchTodaysAttendance = createAsyncThunk('adminAttendance/fetchToday', async (date, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await adminAttendanceApiService.getTodaysAttendance(date, token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const fetchEmployeeHistory = createAsyncThunk(
    'adminAttendance/fetchHistory',
    
    async ({ employeeId, year, month }, thunkAPI) => { 
   
        try {
            const token = thunkAPI.getState().auth.user.token;
          
            return await adminAttendanceApiService.getEmployeeHistory({ employeeId, year, month }, token);
         
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);


export const fetchAttendanceSummary = createAsyncThunk('adminAttendance/fetchSummary', async ({ employeeId, year, month }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await adminAttendanceApiService.getAttendanceSummary({ employeeId, year, month }, token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

const adminAttendanceSlice = createSlice({
    name: 'adminAttendance',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodaysAttendance.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodaysAttendance.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todaysRecords = action.payload;
            })
            .addCase(fetchTodaysAttendance.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchEmployeeHistory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployeeHistory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.employeeHistory = action.payload;
            })
            .addCase(fetchEmployeeHistory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
             .addCase(fetchAttendanceSummary.pending, (state) => {
                state.status = 'loading';
                state.summary = null; // Purana summary data clear karein
            })
            .addCase(fetchAttendanceSummary.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.summary = action.payload; // Naya summary data store karein
            })
            .addCase(fetchAttendanceSummary.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { reset } = adminAttendanceSlice.actions;
export default adminAttendanceSlice.reducer;