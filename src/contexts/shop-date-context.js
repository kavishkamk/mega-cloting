import { createContext, useEffect, useState } from "react";

import SHOP_DATA from "../shop-data.js";
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.util.js";

export const ShopDataContext = createContext({
    shopData: {},
    setShopData: () => { }
});

export const ShopDataProvider = ({ children }) => {

    const [shopData, setShopData] = useState({});

    // load data to the database
    // useEffect(() => {
    //     addCollectionAndDocuments("categories", SHOP_DATA)
    // }, [])

    useEffect(() => {
        const getCategoriesMap = async () => {
            const getCategories = await getCategoriesAndDocuments();
            setShopData(getCategories);
        }
        getCategoriesMap();
    }, []);

    return (
        <ShopDataContext.Provider value={{ shopData, setShopData }}>
            {children}
        </ShopDataContext.Provider>
    );
};