import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import { checkUserSession } from "./store/user/user.action";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/Navigation";
import Spinner from "./components/spinner/spinner.component";

const Authentication = lazy(() => import("./routes/authentication/authentication"));
const Shop = lazy(() => import("./routes/shop/shop.component"));
const CheckOut = lazy(() => import("./routes/checkout/checkout.component"));


const App = () => {

  const dispatch = useDispatch();

  // set authentication
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<CheckOut />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App;
