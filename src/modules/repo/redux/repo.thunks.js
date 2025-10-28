import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRepos } from "../api/repo.api";
import { getCache, setCache } from "../../../services/cacheService";

export const fetchReposThunk = createAsyncThunk(
  "repo/fetchRepos",
  async ({ username, page = 1 }, { getState, rejectWithValue }) => {
    if (page === 1) {
      const cacheKey = `repos_${username}_page_${page}`;
      const cachedData = getCache(cacheKey);

      if (cachedData) {
        return cachedData;
      }
    }

    try {
      const { repos, hasMore } = await fetchRepos(username, page);

      if (page === 1) {
        setCache(`repos_${username}_page_${page}`, { repos, hasMore });
      }

      return { repos, hasMore, page };
    } catch (error) {
      return rejectWithValue(error.message || "Repositoryalarni olishda xato.");
    }
  }
);
