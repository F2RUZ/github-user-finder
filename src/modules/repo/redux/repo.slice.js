import { createSlice } from "@reduxjs/toolkit";
import { fetchReposThunk } from "./repo.thunks";
import { clearUser } from "../../user/redux/user.slice";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  hasMore: false,
  page: 1,
};

const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {
    clearRepos: (state) => {
      state.data = [];
      state.status = "idle";
      state.error = null;
      state.hasMore = false;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReposThunk.pending, (state, action) => {
        state.status = "loading";
        if (action.meta.arg.page === 1) {
          state.data = [];
          state.page = 1;
        }
        state.error = null;
      })
      .addCase(fetchReposThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...state.data, ...action.payload.repos];
        state.hasMore = action.payload.hasMore;
        state.page = action.payload.page;
      })
      .addCase(fetchReposThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message || "Noaniq xato.";
        state.data = [];
        state.hasMore = false;
      })
      .addCase(clearUser, (state) => {
        Object.assign(state, initialState);
      });
  },
});

export const { clearRepos } = repoSlice.actions;
export default repoSlice.reducer;
