import { createContext, useState } from "react";

import SHOP_DATA from "../shop-data.json";

export const ShopDataContext = createContext({
    shopData: [],
    setShopData: () => { }
});

export const ShopDataProvider = ({ children }) => {

    const [shopData, setShopData] = useState(SHOP_DATA);

    return (
        <ShopDataContext.Provider value={{ shopData, setShopData }}>
            {children}
        </ShopDataContext.Provider>
    );
};