import { all, call } from "typed-redux-saga/macro";

import { categoriesSaga } from "./category/categories.saga";
import { userSaga } from "./user/user.saga";

export function* rootSaga() {
    yield* all([
        call(categoriesSaga),
        call(userSaga)
    ]);
};