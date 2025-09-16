import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import testimonialApiService from "./testimonialApiService";

const initialState = {
    testimonials: [],
    status: 'idle',
    error: null,
};

// Helper to get token
const getToken = (thunkAPI) => thunkAPI.getState().auth.user.token;

// Async Thunks
export const fetchTestimonials = createAsyncThunk('testimonials/fetchAll', async (_, thunkAPI) => {
    try {
        return await testimonialApiService.getAllTestimonials(getToken(thunkAPI));
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || error.message);
    }
});

export const addTestimonial = createAsyncThunk('testimonials/add', async (testimonialData, thunkAPI) => {
    try {
        return await testimonialApiService.createTestimonial(testimonialData, getToken(thunkAPI));
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || error.message);
    }
});

export const editTestimonial = createAsyncThunk('testimonials/edit', async ({ id, testimonialData }, thunkAPI) => {
    try {
        return await testimonialApiService.updateTestimonial({ id, testimonialData }, getToken(thunkAPI));
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || error.message);
    }
});

export const removeTestimonial = createAsyncThunk('testimonials/remove', async (id, thunkAPI) => {
    try {
        await testimonialApiService.deleteTestimonial(id, getToken(thunkAPI));
        return id; // Return the ID to remove it from the state
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || error.message);
    }
});


export const testimonialSlice = createSlice({
    name: 'testimonials',
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
            .addCase(fetchTestimonials.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchTestimonials.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.testimonials = action.payload;
            })
            .addCase(fetchTestimonials.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Add
            .addCase(addTestimonial.fulfilled, (state, action) => {
                state.testimonials.unshift(action.payload); // Add new one to the top
            })
            // Edit
            .addCase(editTestimonial.fulfilled, (state, action) => {
                const index = state.testimonials.findIndex(t => t._id === action.payload._id);
                if (index !== -1) {
                    state.testimonials[index] = action.payload;
                }
            })
            // Remove
            .addCase(removeTestimonial.fulfilled, (state, action) => {
                state.testimonials = state.testimonials.filter(t => t._id !== action.payload);
            });
    }
});

export const { reset } = testimonialSlice.actions;
export default testimonialSlice.reducer;