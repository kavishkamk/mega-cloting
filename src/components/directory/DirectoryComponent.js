import DirectoryItem from "../directory-items/DirectoryItem";

import "./directory.styles.scss";

const DirectoryComponent = ({ categories }) => {
    return (
        <div className="categories-container">
            {
                categories.map(({ id, title, imageUrl }) =>
                    <DirectoryItem key={id} title={title} imageUrl={imageUrl} />
                )
            }
        </div>
    );
};

export default DirectoryComponent;