import React, { useRef, useCallback } from "react";
import { List, Typography, Box } from "@mui/material";
import RepoItem from "./RepoItem";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { fetchReposThunk } from "../redux/repo.thunks";
import Loader from "../../../components/UI/Loader";

const RepoList = () => {
  const {
    data: repos,
    status,
    hasMore,
    page,
  } = useAppSelector((state) => state.repo);
  const username = useAppSelector((state) => state.user.data?.login);
  const dispatch = useAppDispatch();

  const observer = useRef();
  const lastRepoElementRef = useCallback(
    (node) => {
      if (status === "loading") return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && username) {
          dispatch(fetchReposThunk({ username, page: page + 1 }));
        }
      });

      if (node) observer.current.observe(node);
    },
    [status, hasMore, page, username, dispatch]
  );

  if (repos.length === 0 && status === "succeeded") {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Bu foydalanuvchida ommaviy repositoryalar topilmadi.
        </Typography>
      </Box>
    );
  }

  const isLoadingMore = status === "loading" && repos.length > 0;

  return (
    <>
      <List>
        {repos.map((repo, index) => {
          if (repos.length === index + 1) {
            return (
              <RepoItem ref={lastRepoElementRef} key={repo.id} repo={repo} />
            );
          }
          return <RepoItem key={repo.id} repo={repo} />;
        })}
      </List>

      {isLoadingMore && (
        <Box sx={{ py: 3, textAlign: "center" }}>
          <Loader size={30} message="Ko'proq repositoryalar yuklanmoqda..." />
        </Box>
      )}

      {status === "succeeded" && !hasMore && repos.length > 0 && (
        <Box sx={{ py: 2, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Barcha repositoryalar yuklandi.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default RepoList;
