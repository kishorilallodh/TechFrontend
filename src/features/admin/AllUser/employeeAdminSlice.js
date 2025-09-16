import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeAdminApiService from "./employeeAdminApiService";

const initialState = {
     admins: [],
    employees: [],
    status: 'idle',
    error: null,
};

// Helper to get token
const getToken = (thunkAPI) => thunkAPI.getState().auth.user.token;

export const fetchAdmins = createAsyncThunk('admin/admins/fetchAll', async (_, thunkAPI) => {
    try {
        return await employeeAdminApiService.getAllAdmins(getToken(thunkAPI));
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});


// Async Thunks
export const fetchEmployees = createAsyncThunk('admin/employees/fetchAll', async (_, thunkAPI) => {
    try {
        return await employeeAdminApiService.getAllEmployees(getToken(thunkAPI));
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const addEmployee = createAsyncThunk('admin/employees/add', async (employeeData, thunkAPI) => {
    try {
        const response = await employeeAdminApiService.createEmployee(employeeData, getToken(thunkAPI));
        // We need to fetch the full list again to get the populated profile info, or just add the basic user info
        thunkAPI.dispatch(fetchEmployees()); // Refresh the list
        return response; // Return the success message and user data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const removeEmployee = createAsyncThunk('admin/employees/remove', async (employeeId, thunkAPI) => {
    try {
        await employeeAdminApiService.deleteEmployee(employeeId, getToken(thunkAPI));
        return employeeId; // Return the ID for removal from state
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const employeeAdminSlice = createSlice({
    name: 'adminEmployees', // Slice ka naam unique rakhein
    initialState,
    reducers: {
        reset: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchEmployees.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Add (We are refetching, so we just handle pending/rejected for loading state)
            .addCase(addEmployee.pending, (state) => { state.status = 'loading'; })
            .addCase(addEmployee.fulfilled, (state) => {
                state.status = 'succeeded'; // The list will be updated by fetchEmployees
            })
            .addCase(addEmployee.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Remove
            .addCase(removeEmployee.pending, (state) => { state.status = 'loading'; })
            .addCase(removeEmployee.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.employees = state.employees.filter(emp => emp._id !== action.payload);
            })
            .addCase(removeEmployee.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(fetchAdmins.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchAdmins.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.admins = action.payload; // Admins state ko update karein
            })
            .addCase(fetchAdmins.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { reset } = employeeAdminSlice.actions;
export default employeeAdminSlice.reducer;