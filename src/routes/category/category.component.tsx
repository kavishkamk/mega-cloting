import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/category/categories.selector";

import ProductCard from "../../components/product-card/product-card.component";

import { CategoryTitle, CategoryContainer } from "./category.styles";
import Spinner from "../../components/spinner/spinner.component";

type CategoryRouteParams = {
    category: string;
};

const Category = () => {

    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const categoryMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    const [products, setProducts] = useState(categoryMap[category]);

    useEffect(() => {
        setProducts(categoryMap[category]);
    }, [category, categoryMap]);

    return (
        <>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {
                isLoading ? <Spinner /> :
                    (
                        <CategoryContainer>
                            {
                                products && products.map(product => (<ProductCard key={product.id} product={product} />))
                            }
                        </CategoryContainer>
                    )
            }
        </>
    )

};

export default Category;