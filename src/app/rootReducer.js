import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "../modules/user/redux/user.slice";
import repoReducer from "../modules/repo/redux/repo.slice";

const rootReducer = combineReducers({
  user: userReducer,
  repo: repoReducer,
});

export default rootReducer;
