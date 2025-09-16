import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import salaryApiService from './salaryApiService';

const initialState = {
    employeeDetails: null,
    userSlips: [],
    monthlyHistory: {
        slips: [],
        summary: null,
    },
    mySlips: [],
    // Status management
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    success: null,
};

// Helper function to get token from state
const getToken = (thunkAPI) => {
    // Apne auth slice ka path yahan adjust karein
    return thunkAPI.getState().auth.user.token; 
};

// ------------ ASYNC THUNKS ------------

export const fetchEmployeeDetailsForSalary = createAsyncThunk(
    "salary/fetchEmployeeDetails",
    async ({ userId, month, year }, thunkAPI) => {
        try {
            const token = getToken(thunkAPI);
            const result = await salaryApiService.fetchEmployeeDetails({ userId, month, year }, token);
            return result.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createDraftSlip = createAsyncThunk(
    "salary/createDraft",
    async ({ userId, slipData }, thunkAPI) => {
        try {
            const token = getToken(thunkAPI);
            const result = await salaryApiService.createDraft({ userId, slipData }, token);
            return result.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const publishSlip = createAsyncThunk(
    "salary/publish",
    async (slipId, thunkAPI) => {
        try {
            const token = getToken(thunkAPI);
            const result = await salaryApiService.publish(slipId, token);
            return result.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchSlipsForUserByAdmin = createAsyncThunk(
    "salary/fetchForUserByAdmin",
    async (userId, thunkAPI) => {
        try {
            const token = getToken(thunkAPI);
            const result = await salaryApiService.fetchSlipsForUser(userId, token);
            return result.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchMonthlyHistory = createAsyncThunk(
    "salary/fetchMonthlyHistory",
    async ({ month, year }, thunkAPI) => {
        try {
            const token = getToken(thunkAPI);
            const result = await salaryApiService.fetchMonthlyHistoryForAdmin({ month, year }, token);
            return result.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchMySlips = createAsyncThunk(
    "salary/fetchMySlips",
    async (filters = {}, thunkAPI) => {
        try {
            const token = getToken(thunkAPI);
            const result = await salaryApiService.fetchOwnSlips(filters, token);
            return result.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// ------------ SLICE DEFINITION ------------

const salarySlice = createSlice({
    name: "salary",
    initialState,
    reducers: {
        clearSalaryState: (state) => {
            state.employeeDetails = null;
            state.error = null;
            state.success = null;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder

            // Specific fulfilled handlers
            .addCase(fetchEmployeeDetailsForSalary.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.employeeDetails = action.payload;
            })
            .addCase(createDraftSlip.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.success = "Draft slip created successfully!";
                state.userSlips.unshift(action.payload);
            })
            .addCase(publishSlip.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.success = "Slip published successfully!";
                const index = state.userSlips.findIndex(s => s._id === action.payload._id);
                if (index !== -1) {
                    state.userSlips[index] = action.payload;
                }
            })
            .addCase(fetchSlipsForUserByAdmin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userSlips = action.payload;
            })
            .addCase(fetchMonthlyHistory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.monthlyHistory = action.payload;
            })
            .addCase(fetchMySlips.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mySlips = action.payload;
            })

             // Generic pending, fulfilled, rejected handlers
            .addMatcher(
                (action) => action.type.startsWith('salary/') && action.type.endsWith('/pending'),
                (state) => {
                    state.status = 'loading';
                    state.error = null;
                    state.success = null;
                }
            )
            .addMatcher(
                (action) => action.type.startsWith('salary/') && action.type.endsWith('/rejected'),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload;
                }
            );
    },
});

export const { clearSalaryState } = salarySlice.actions;
export default salarySlice.reducer;