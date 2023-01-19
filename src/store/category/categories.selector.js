export const selectCategoriesMap = state => state.categories.categories
    .reduce((acc, category) => {
        const { items, title } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});