// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "./AuthAPI"; // Aapka naya authApi file

// 👉 1. LocalStorage se user data nikalne ki koshish karo
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  // 👉 2. Agar localStorage me user hai to use initial state banao, warna null
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Async Thunks (Inme koi change nahi karna, ye aache se bane hain)
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authApi.register(user);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authApi.login(user);
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authApi.logout();
});

export const sendPasswordResetLink = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      return await authApi.forgotPassword(email);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const performPasswordReset = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, thunkAPI) => {
    try {
      return await authApi.resetPassword({ token, password });
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user.name = action.payload.name;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.user = action.payload.user;
        // // 👉 3. Register successful hone par user data localStorage me save karo
        // localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        // 👉 3. Login successful hone par user data localStorage me save karo
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
       .addCase(logout.fulfilled, (state) => {
          state.user = null;
          localStorage.removeItem('user');
      })
      .addCase(logout.pending, (state) => { // Optional: loading state for logout
          state.isLoading = true;
      })
      .addCase(logout.rejected, (state, action) => { // Optional: handle logout failure
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      })
      .addCase(performPasswordReset.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.user = action.payload.user;
        // localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(performPasswordReset.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(performPasswordReset.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
  },
});

export const { reset, updateUser } = authSlice.actions;
export default authSlice.reducer;
