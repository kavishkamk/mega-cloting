import React, { useContext } from "react";
import ProductCard from "../../components/product-card/product-card.component";

import { ShopDataContext } from "../../contexts/shop-date-context";

import "./shop.styles.scss";

const Shop = () => {

    const { shopData } = useContext(ShopDataContext);

    return (
        <div className="product-container">
            {shopData.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default Shop;