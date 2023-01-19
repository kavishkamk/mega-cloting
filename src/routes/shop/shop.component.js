import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { setCategories } from "../../store/category/categories.action";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { } from "./shop.styles";

const Shop = () => {

    const dispatch = useDispatch();

    // get category map data and set into redux store
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categories = await getCategoriesAndDocuments();
            dispatch(setCategories(categories));
        }
        getCategoriesMap();
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
};

export default Shop;