import { Routes, Route } from "react-router-dom";

import "./categories.styles.scss";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/Navigation";
import SignIn from "./routes/sign-in/SignIn";


const Shop = () => {
  return (<h1>Shop page</h1>)
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="signin" element={<SignIn />} />
      </Route>
    </Routes>
  )
}

export default App;
