import axiosClient from "../../../services/axiosClient";

const REPOS_PER_PAGE = 20;

export const fetchRepos = async (username, page = 1) => {
  const response = await axiosClient.get(`/users/${username}/repos`, {
    params: {
      per_page: REPOS_PER_PAGE,
      page: page,
      sort: "updated",
      direction: "desc",
    },
  });
  const hasMore =
    response.headers.link?.includes('rel="next"') ||
    response.data.length === REPOS_PER_PAGE;
  return { repos: response.data, hasMore };
};
