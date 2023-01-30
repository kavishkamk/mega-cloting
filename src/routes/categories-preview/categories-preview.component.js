import React from "react";
import { useSelector } from "react-redux";

import { selectCategoriesMap } from "../../store/category/categories.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {

    const shopData = useSelector(selectCategoriesMap);

    return (
        <>
            {
                Object.keys(shopData).map(title => {
                    const products = shopData[title];
                    return <CategoryPreview key={title} title={title} products={products} />
                })
            }
        </>
    );
};

export default CategoriesPreview;