import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/Navigation";
import Authentication from "./routes/authentication/authentication";
import Shop from "./routes/shop/shop.component";
import CheckOut from "./routes/checkout/checkout.component";

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener
} from "./utils/firebase/firebase.util";
import { setCurrentUser } from "./store/user/user.action";

const App = () => {

  const dispatch = useDispatch();

  // set authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      dispatch(setCurrentUser(user));
      if (user) {
        createUserDocumentFromAuth(user);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  )
}

export default App;
