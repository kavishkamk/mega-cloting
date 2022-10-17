import CategoryItem from "../category-items/CategoryItem";

import "./directory.styles.scss";

const DirectoryComponent = ({ categories }) => {
    return (
        <div className="categories-container">
            {
                categories.map(({ id, title, imageUrl }) =>
                    <CategoryItem key={id} title={title} imageUrl={imageUrl} />
                )
            }
        </div>
    );
};

export default DirectoryComponent;