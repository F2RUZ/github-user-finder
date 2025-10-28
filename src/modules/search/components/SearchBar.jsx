import React, { useState, useEffect } from "react";
import { Box, TextField, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchUserThunk } from "../../user/redux/user.thunks";
import { fetchReposThunk } from "../../repo/redux/repo.thunks";
import { clearUser } from "../../user/redux/user.slice";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 600); // 600ms debounce

  const dispatch = useAppDispatch();
  const userStatus = useAppSelector((state) => state.user.status);
  const currentLogin = useAppSelector((state) => state.user.data?.login); // Hook komponent tanasiga ko'chirildi

  const isLoading = userStatus === "loading";

  // Debounced input o'zgarganda qidiruvni ishga tushirish
  useEffect(() => {
    if (debouncedInput && debouncedInput.length >= 2) {
      handleSearch(debouncedInput.trim());
    }

    if (!debouncedInput) {
      // Input bo'sh bo'lsa profillarni tozalash
      dispatch(clearUser());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput]);

  const handleSearch = (usernameToSearch) => {
    // Endi hook emas, komponent tanasida olingan qiymat ishlatiladi (currentLogin)
    if (usernameToSearch && usernameToSearch !== currentLogin) {
      // User va Repositoriyalarni parallel ravishda chaqirish
      dispatch(fetchUserThunk(usernameToSearch));
      dispatch(fetchReposThunk({ username: usernameToSearch, page: 1 }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(input.trim());
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 2,
        mb: 4,
        p: { xs: 2, md: 0 },
        maxWidth: "800px",
        mx: "auto",
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        label="GitHub foydalanuvchi nomini kiriting..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isLoading || !input.trim()}
      >
        Qidirish
      </Button>
    </Box>
  );
};

export default SearchBar;
