import { AnyAction } from "redux";

import { fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess } from "./categories.action";

import { category } from "./categories.types";

export type CategoryState = {
    readonly categories: category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: CategoryState = {
    categories: [],
    isLoading: false,
    error: null
};

export const categoriesReducer = (state = INITIAL_STATE, action: AnyAction): CategoryState => {

    if (fetchCategoriesStart.match(action)) {
        return {
            ...state,
            isLoading: true
        };
    };

    if (fetchCategoriesSuccess.match(action)) {
        return {
            ...state,
            isLoading: false,
            categories: action.payload,
            error: null
        };
    };

    if (fetchCategoriesFailed.match(action)) {
        return {
            ...state,
            isLoading: false,
            error: action.payload
        };
    };

    return state;

};