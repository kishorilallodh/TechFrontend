// features/admin/jobs/jobSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jobApiService from "./jobApiService";

const initialState = { jobs: [], status: "idle", error: null };
const getToken = (thunkAPI) => thunkAPI.getState().auth.user.token;

export const fetchJobs = createAsyncThunk(
  "jobs/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await jobApiService.getAllJobsForAdmin(getToken(thunkAPI));
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
export const addJob = createAsyncThunk(
  "jobs/add",
  async (jobData, thunkAPI) => {
    try {
      return await jobApiService.createJob(jobData, getToken(thunkAPI));
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
export const editJob = createAsyncThunk(
  "jobs/edit",
  async ({ id, jobData }, thunkAPI) => {
    try {
      return await jobApiService.updateJob({ id, jobData }, getToken(thunkAPI));
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
// ✅ Delete thunk now returns both the message and the ID for confirmation
export const removeJob = createAsyncThunk(
  "jobs/remove",
  async (id, thunkAPI) => {
    try {
      const response = await jobApiService.deleteJob(id, getToken(thunkAPI));
      return { id, message: response.message };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

const jobSlice = createSlice({
  name: "adminJobs",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add, Edit, Remove cases
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs.unshift(action.payload.job); // ✅ Use the `job` property from the response
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.jobs.findIndex(
          (j) => j._id === action.payload.job._id
        );
        if (index !== -1) state.jobs[index] = action.payload.job;
      })
      .addCase(removeJob.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = state.jobs.filter((j) => j._id !== action.payload.id); // ✅ Use action.payload.id
      })
      // Generic Pending/Rejected cases
      .addMatcher(
        (action) =>
          action.type.startsWith("jobs/") && action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("jobs/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const { reset } = jobSlice.actions;
export default jobSlice.reducer;
