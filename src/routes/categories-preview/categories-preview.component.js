import React, { useContext } from "react";

import CategoryPreview from "../../components/category-preview/category-preview.component";

import { ShopDataContext } from "../../contexts/shop-date-context";

const CategoriesPreview = () => {

    const { shopData } = useContext(ShopDataContext);

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