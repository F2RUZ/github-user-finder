import { createSlice } from "@reduxjs/toolkit";
import { fetchUserThunk } from "./user.thunks";

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Foydalanuvchi ma'lumotlarini tozalaydi

    clearUser: (state) => {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      //Ma'lumotlar yuklanmoqda holati

      .addCase(fetchUserThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      // Ma'lumotlar muvaffaqiyatli yuklandi

      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })

      // Xato holati

      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || action.error?.message || "Noaniq xato yuz berdi.";
        state.data = null;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
