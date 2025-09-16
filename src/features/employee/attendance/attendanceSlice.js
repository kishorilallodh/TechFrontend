import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import attendanceApiService from "./attendanceApiService";

const initialState = {
    todayAttendance: null, // Aaj ka record store karega
    monthlyRecords: {}, // Calendar ke liye: {'2025-08-01': 'Present', ...}
    status: 'idle',
    error: null,
};

// Async Thunks
export const doClockIn = createAsyncThunk('attendance/clockIn', async (workPlan, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await attendanceApiService.clockIn({ workPlan }, token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || error.message);
    }
});

export const doClockOut = createAsyncThunk('attendance/clockOut', async (workSummary, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await attendanceApiService.clockOut({ workSummary }, token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || error.message);
    }
});

export const fetchTodayAttendance = createAsyncThunk('attendance/fetchToday', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await attendanceApiService.getTodayAttendance(token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || error.message);
    }
});

export const fetchMonthlyAttendance = createAsyncThunk('attendance/fetchMonthly', async ({ year, month }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await attendanceApiService.getMonthlyAttendance({ year, month }, token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || error.message);
    }
});

export const doRequestLeave = createAsyncThunk('attendance/requestLeave', async (reason, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await attendanceApiService.requestLeave({ reason }, token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || error.message);
    }
});

export const attendanceSlice = createSlice({
    name: "attendance",
    initialState,
    reducers: {
        reset: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // ✅ Step 1: Saare .addCase pehle likhein
            .addCase(doClockIn.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todayAttendance = action.payload.attendance;
            })
            .addCase(doClockOut.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todayAttendance = action.payload.attendance;
            })
            .addCase(fetchTodayAttendance.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todayAttendance = action.payload;
            })
            .addCase(fetchMonthlyAttendance.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const recordsMap = {};
                action.payload.forEach(rec => {
                    const dateKey = rec.date.split('T')[0];
                    recordsMap[dateKey] = rec.status;
                });
                state.monthlyRecords = recordsMap;
            })
            .addCase(doRequestLeave.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Jab leave request successful ho, to todayAttendance ko update kar dein
                state.todayAttendance = action.payload.attendance;
            })
            
            // ✅ Step 2: Saare .addMatcher iske baad likhein
            .addMatcher(
                (action) => action.type.startsWith('attendance/') && action.type.endsWith('/pending'),
                (state) => { 
                    state.status = 'loading'; 
                }
            )
            .addMatcher(
                (action) => action.type.startsWith('attendance/') && action.type.endsWith('/rejected'),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload;
                }
            );
    },
});

export const { reset } = attendanceSlice.actions;
export default attendanceSlice.reducer;