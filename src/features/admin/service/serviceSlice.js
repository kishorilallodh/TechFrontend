// src/features/services/servicesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchServices,
  fetchServiceById,
  fetchServiceBySlug,
  createService,
  updateService,
  deleteService,
} from "./serviceApi";

// ✅ Step 1: Initial State ko salarySlice jaisa banayein
const initialState = {
  list: [],
  selected: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  success: null,
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
    // Ek naya reducer state ko reset karne ke liye
    resetServiceStatus: (state) => {
      state.status = 'idle';
      state.error = null;
      state.success = null;
    }
  },
  // ✅ Step 2: extraReducers ko .addMatcher() ke saath refactor karein
  extraReducers: (builder) => {
    builder
      // ------------ SPECIFIC 'FULFILLED' HANDLERS ------------
      // Har thunk ke successful hone par kya karna hai, woh yahan likhein
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selected = action.payload;
      })
      .addCase(fetchServiceBySlug.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selected = action.payload;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
        state.success = "Service created successfully";
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.list.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.success = "Service updated successfully";
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = state.list.filter((s) => s._id !== action.payload);
        state.success = "Service deleted successfully";
      })

      // ------------ GENERIC HANDLERS USING .addMatcher() ------------
      // ✨ Yeh 'services/' se shuru hone wale sabhi PENDING actions ko handle karega
      .addMatcher(
        (action) => action.type.startsWith('services/') && action.type.endsWith('/pending'),
        (state) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        }
      )
      // ✨ Yeh 'services/' se shuru hone wale sabhi REJECTED actions ko handle karega
      .addMatcher(
        (action) => action.type.startsWith('services/') && action.type.endsWith('/rejected'),
        (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }
      );
  },
});

export const { clearMessages, resetServiceStatus } = servicesSlice.actions;
export default servicesSlice.reducer;