import { FC } from "react";
import { CategoryItem } from "../../store/category/categories.types";

import ProductCard from "../product-card/product-card.component";

import { CategoryPreviewContainer, Preview, TitleLink } from "./category-preview.styles";

type CategoryPreviewProps = {
    title: string;
    products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <TitleLink to={title}>{title.toUpperCase()}</TitleLink>
            </h2>
            <Preview>
                {
                    products
                        .filter((_, index) => index < 4)
                        .map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                }
            </Preview>
        </CategoryPreviewContainer>
    )
};

export default CategoryPreview;