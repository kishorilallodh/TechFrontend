import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import technologyApiService from './technologyApiService';

const initialState = {
    technologies: [],
    status: 'idle',
    error: null,
};

const getToken = (thunkAPI) => thunkAPI.getState().auth.user.token;

export const getAllTechnologies = createAsyncThunk('technologies/fetchAll', async (_, thunkAPI) => {
    try {
        return await technologyApiService.fetchAll();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
});

export const createNewTechnology = createAsyncThunk('technologies/create', async (techData, thunkAPI) => {
    try {
        return await technologyApiService.create(techData, getToken(thunkAPI));
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
});

export const deleteTechnology = createAsyncThunk('technologies/delete', async (techId, thunkAPI) => {
    try {
        return await technologyApiService.deleteById(techId, getToken(thunkAPI));
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
});

export const updateTechnology = createAsyncThunk('technologies/update', async ({ id, techData }, thunkAPI) => {
    try {
        const token = getToken(thunkAPI);
        return await technologyApiService.update({ id, techData }, token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
});

const technologySlice = createSlice({
    name: 'technologies',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Fetch All
            .addCase(getAllTechnologies.pending, (state) => { state.status = 'loading'; })
            .addCase(getAllTechnologies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.technologies = action.payload;
            })
            .addCase(getAllTechnologies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Create
            .addCase(createNewTechnology.pending, (state) => { state.status = 'loading'; })
            .addCase(createNewTechnology.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.technologies.push(action.payload.technology);
            })
            .addCase(createNewTechnology.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Delete
            .addCase(deleteTechnology.pending, (state) => { state.status = 'loading'; })
            .addCase(deleteTechnology.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.technologies = state.technologies.filter(t => t._id !== action.payload.id);
            })
            .addCase(deleteTechnology.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
             .addCase(updateTechnology.pending, (state) => { state.status = 'loading'; })
            .addCase(updateTechnology.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updatedTech = action.payload.technology;
                const index = state.technologies.findIndex(t => t._id === updatedTech._id);
                if (index !== -1) {
                    state.technologies[index] = updatedTech;
                }
            })
            .addCase(updateTechnology.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { reset } = technologySlice.actions;
export default technologySlice.reducer;