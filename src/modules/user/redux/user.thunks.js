import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser } from "../api/user.api";
import { getCache, setCache } from "../../../services/cacheService";


export const fetchUserThunk = createAsyncThunk(
  "user/fetchUser",
  async (username, { rejectWithValue }) => {
    const cacheKey = `user_${username}`;
    const cachedData = getCache(cacheKey);

    if (cachedData) {
      // Cache'dan ma'lumotni qaytarish
      return cachedData;
    }

    try {
      const userData = await fetchUser(username);
      // Muoffaqiyatli bo'lsa cache'ga saqlash
      setCache(cacheKey, userData);
      return userData;
    } catch (error) {
      //404 error
      return rejectWithValue(
        error.message || "Profil ma'lumotlarini olishda xato."
      );
    }
  }
);
