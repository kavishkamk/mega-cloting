import { createAction } from "../../utils/reducers/reducer.util";
import { USER_ACTION_TYPES } from "./user.types";

const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export { setCurrentUser };