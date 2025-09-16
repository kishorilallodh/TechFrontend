import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import certificateService from './certificateService';

const initialState = {
    requests: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// --- ASYNC THUNKS ---

// USER: Create new request
export const createCertificateRequest = createAsyncThunk(
    'certificates/create',
    async (requestData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token; // Assuming auth state is available
            return await certificateService.createRequest(requestData, token);
        } catch (error) {
            const message = (error.response?.data?.message) || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// USER: Fetch user's own requests
export const fetchUserRequests = createAsyncThunk(
    'certificates/fetchUser',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await certificateService.getUserRequests(token);
        } catch (error) {
            const message = (error.response?.data?.message) || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// ADMIN: Fetch all requests
export const fetchAllRequests = createAsyncThunk(
    'certificates/fetchAllAdmin',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token; // Admin token
            return await certificateService.getAllRequests(token);
        } catch (error) {
            const message = (error.response?.data?.message) || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// ADMIN: Update request status
export const updateRequestStatus = createAsyncThunk(
    'certificates/updateStatus',
    async ({ requestId, updateData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            // updateData mein { status: 'Approved' } ya { status: 'Rejected', adminRemarks: '...' } ho sakta hai
            return await certificateService.updateStatus(requestId, updateData, token);
        } catch (error) {

            const message = (error.response?.data?.message) || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// ADMIN: Delete a certificate request
export const deleteCertificateRequest = createAsyncThunk(
    'certificates/delete',
    async (requestId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            // The service returns { message, id }, we pass this to the reducer
            return await certificateService.deleteRequest(requestId, token);
        } catch (error) {
            const message = (error.response?.data?.message) || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const certificateSlice = createSlice({
    name: 'certificates',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Handle create request
            .addCase(createCertificateRequest.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createCertificateRequest.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.requests.push(action.payload); // Add new request to state
            })
            .addCase(createCertificateRequest.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
             // Handle status update
            .addCase(updateRequestStatus.fulfilled, (state, action) => {
                const index = state.requests.findIndex(req => req._id === action.payload._id);
                if (index !== -1) {
                    state.requests[index] = action.payload; // Update the specific request
                }
            })
           .addCase(deleteCertificateRequest.fulfilled, (state, action) => {
                state.requests = state.requests.filter(
                    (request) => request._id !== action.payload.id
                );
            })
            .addCase(deleteCertificateRequest.rejected, (state, action) => {
                 // You might not need to do anything here if you handle errors with toast
                 state.error = action.payload;
            })
            // Handle fetching requests (for both user and admin)
            .addMatcher(
                (action) => action.type.endsWith('/pending') && action.type.startsWith('certificates/fetch'),
                (state) => { state.status = 'loading'; }
            )
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled') && action.type.startsWith('certificates/fetch'),
                (state, action) => {
                    state.status = 'succeeded';
                    state.requests = action.payload;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected') && action.type.startsWith('certificates/fetch'),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload;
                }
            );
           
    },
});

export const { reset } = certificateSlice.actions;
export default certificateSlice.reducer;