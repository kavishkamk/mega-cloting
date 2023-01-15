import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";

import { ShopDataContext } from "../../contexts/shop-date-context";

import { CategoryTitle, CategoryContainer } from "./category.styles";

const Category = () => {

    const { category } = useParams();
    const { shopData } = useContext(ShopDataContext);
    const [products, setProducts] = useState(shopData[category]);

    useEffect(() => {
        setProducts(shopData[category]);
    }, [category, shopData]);

    return (
        <>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {
                    products && products.map(product => (<ProductCard key={product.id} product={product} />))
                }
            </CategoryContainer>
        </>
    )

};

export default Category;