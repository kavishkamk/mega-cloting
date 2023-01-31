import { createSelector } from "reselect";

const selectCategoriesReducer = (state) => state.categories;

const selectCategories = createSelector(
    [selectCategoriesReducer],
    (categorySlice) => categorySlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    categories => categories
        .reduce((acc, category) => {
            const { items, title } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {})
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoriesReducer],
    (categorySlice) => categorySlice.isLoading
);
