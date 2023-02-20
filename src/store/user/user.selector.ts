import { createSelector } from "reselect";

import { RootState } from "../store";

import { UserState } from "./user.reducer";

export const selectUserSelecter = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
    [selectUserSelecter],
    (user) => user.currentUser
);