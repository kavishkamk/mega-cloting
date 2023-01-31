import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";
import { createAction } from "../../utils/reducers/reducer.util";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export const fetchCategoriesStart =
    () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess =
    (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed =
    (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch) => {

    dispatch(fetchCategoriesStart());

    try {
        const categories = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categories));
    } catch (error) {
        dispatch(fetchCategoriesFailed(error));
    };

};