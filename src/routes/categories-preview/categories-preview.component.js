import React from "react";
import { useSelector } from "react-redux";

import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/category/categories.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {

    const shopData = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <>
            {
                isLoading ? <Spinner /> :
                    (
                        Object.keys(shopData).map(title => {
                            const products = shopData[title];
                            return <CategoryPreview key={title} title={title} products={products} />
                        })
                    )
            }
        </>
    );
};

export default CategoriesPreview;