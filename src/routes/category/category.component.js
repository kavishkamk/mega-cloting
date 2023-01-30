import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectCategoriesMap } from "../../store/category/categories.selector";

import ProductCard from "../../components/product-card/product-card.component";

import { CategoryTitle, CategoryContainer } from "./category.styles";

const Category = () => {

    const { category } = useParams();
    const categoryMap = useSelector(selectCategoriesMap)
    const [products, setProducts] = useState(categoryMap[category]);

    useEffect(() => {
        setProducts(categoryMap[category]);
    }, [category, categoryMap]);

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