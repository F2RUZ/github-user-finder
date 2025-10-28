import React from "react";
import { Box, Typography, Card, Tabs, Tab, Link } from "@mui/material";
import SearchBar from "../modules/search/components/SearchBar";
import ProfileCard from "../modules/user/components/ProfileCard";
import RepoList from "../modules/repo/components/RepoList";
import EmptyState from "../components/UI/EmptyState";
import Loader from "../components/UI/Loader";
import ErrorMessage from "../components/UI/ErrorMessage";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { fetchUserThunk } from "../modules/user/redux/user.thunks";
import { fetchReposThunk } from "../modules/repo/redux/repo.thunks";

// Tablar uchun yordamchi komponent
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

//Asosiy Bosh Sahifa.

const HomePage = () => {
  const [currentTab, setCurrentTab] = React.useState(0);

  const userData = useAppSelector((state) => state.user.data);
  const userStatus = useAppSelector((state) => state.user.status);
  const userError = useAppSelector((state) => state.user.error);
  const repoStatus = useAppSelector((state) => state.repo.status);

  const dispatch = useAppDispatch();

  const isLoading = userStatus === "loading";
  const showProfile = userStatus === "succeeded" && userData;
  const showError = userStatus === "failed" || repoStatus === "failed";
  const showInitialState = userStatus === "idle" && !userData && !showError;

  const handleRetry = () => {
    if (userData?.login) {
      dispatch(fetchUserThunk(userData.login));
      dispatch(fetchReposThunk({ username: userData.login, page: 1 }));
    }
  };

  return (
    <Box sx={{ flexGrow: 1, py: 4, px: { xs: 2, md: 4 } }}>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        fontWeight="700"
        sx={{ mb: 4 }}
      >
        GitHub User Finder
      </Typography>

      <SearchBar />

      {isLoading && (
        <Loader message="Foydalanuvchi ma'lumotlari yuklanmoqda..." />
      )}

      {showError && (
        <ErrorMessage
          message={userError || "Ma'lumotlarni olishda kutilmagan xato."}
          onRetry={handleRetry}
        />
      )}

      {showInitialState && <EmptyState />}

      {showProfile && (
        <>
          <ProfileCard />

          {/* Tabs Section */}
          <Card sx={{ mt: 4, borderRadius: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={currentTab}
                onChange={(_, newValue) => setCurrentTab(newValue)}
                aria-label="profile tabs"
                variant="fullWidth"
              >
                <Tab label={`Repositories (${userData.public_repos})`} />
                <Tab label="About" />
              </Tabs>
            </Box>

            <TabPanel value={currentTab} index={0}>
              <RepoList />
            </TabPanel>

            <TabPanel value={currentTab} index={1}>
              <Box sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Qo'shimcha ma'lumotlar
                </Typography>
                <Typography variant="body1">
                  **Turi:** {userData.type}
                </Typography>
                <Typography variant="body1">
                  **Yaratilgan sana:**{" "}
                  {new Date(userData.created_at).toLocaleDateString()}
                </Typography>
                {userData.company && (
                  <Typography variant="body1">
                    **Kompaniya:** {userData.company}
                  </Typography>
                )}
                {userData.email && (
                  <Typography variant="body1">
                    **Email:** {userData.email}
                  </Typography>
                )}
                {userData.blog && (
                  <Typography variant="body1">
                    **Blog:**{" "}
                    <Link href={userData.blog} target="_blank">
                      {userData.blog}
                    </Link>
                  </Typography>
                )}
              </Box>
            </TabPanel>
          </Card>
        </>
      )}
    </Box>
  );
};

export default HomePage;
