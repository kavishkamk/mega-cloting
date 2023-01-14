import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";

import { ShopDataContext } from "../../contexts/shop-date-context";

import "./category.styles.scss";

const Category = () => {

    const { category } = useParams();
    const { shopData } = useContext(ShopDataContext);
    const [products, setProducts] = useState(shopData[category]);

    useEffect(() => {
        setProducts(shopData[category]);
    }, [category, shopData]);

    return (
        <>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            <div className="category-container">
                {
                    products && products.map(product => (<ProductCard key={product.id} product={product} />))
                }
            </div>
        </>
    )

};

export default Category;