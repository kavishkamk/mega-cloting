import { createSelector } from "reselect";
import { RootState } from "../store";
import { CategoryMap } from "./categories.types";

import { CategoryState } from "./category.reducer";

const selectCategoriesReducer = (state: RootState): CategoryState => state.categories;

const selectCategories = createSelector(
    [selectCategoriesReducer],
    (categorySlice) => categorySlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoryMap => categories
        .reduce((acc, category) => {
            const { items, title } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoriesReducer],
    (categorySlice) => categorySlice.isLoading
);
