// features/profile/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileApiService from "./profileApiService";

// 👉 Initial state of profile slice
const initialState = {
  profile: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

// ✅ Thunk: fetch my profile
export const fetchMyProfile = createAsyncThunk(
  "profile/fetchMyProfile",
  async (_, thunkAPI) => {
    try {
      // 👉 Token state se uthaya (auth slice ke andar h)
      const token = thunkAPI.getState().auth.user.token;
      return await profileApiService.getMyProfile(token);
    } catch (error) {
      // 👉 Error message handle kar ke return karna
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Thunk: update or create profile
export const updateMyProfile = createAsyncThunk(
  "profile/updateMyProfile",
  async (profileData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await profileApiService.upsertMyProfile(profileData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchUserProfileById = createAsyncThunk('profile/fetchById', async (userId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await profileApiService.getProfileByUserId(userId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
});



// ✅ Slice
export const profileSlice = createSlice({
  name: "profile",
  initialState:{
        profile: null,
        viewedProfile: null, // 👈 Admin dwara dekhe ja rahe profile ke liye naya state
        status: 'idle',
        error: null,
    },
  reducers: {
    // 👉 Reset profile state
    resetProfile: (state) => {
      state.profile = null;
      state.status = "idle";
      state.error = null;
    },
     resetViewedProfile: (state) => { // 👈 Naya reducer
            state.viewedProfile = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // 👉 Fetch profile cases
      .addCase(fetchMyProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload; // 👉 API se profile aa gayi
      })
      .addCase(fetchMyProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // 👉 Error ko state me save kar diya
      })
      // 👉 Update profile cases
      .addCase(updateMyProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload.profile; // 👉 API response { message, profile }
      })
      .addCase(updateMyProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUserProfileById.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchUserProfileById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.viewedProfile = action.payload; // Naye state me data save karein
            })
            .addCase(fetchUserProfileById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
        });
  },
});

// ✅ Export actions & reducer
export const { resetProfile , resetViewedProfile} = profileSlice.actions;
export default profileSlice.reducer;
