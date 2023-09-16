import "./App.css";
import Header from "./component/layout/Header/Header.js";
import ButtonState from "../src/context/ButtonState";
import WebFont from "webfontloader";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/layout/Home/Home";
import Coupons from "./component/layout/Home/Coupons.js";
import ProductDetails from "./component/layout/Product/ProductDetails";
import AllProducts from "./component/layout/Product/AllProducts";
import Search from "./component/layout/Product/Search";
import Login from "./component/layout/user/Login";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/layout/user/Profile";
import ProfileUpdate from "./component/layout/user/ProfileUpdate";
import PasswordUpdate from "./component/layout/user/PasswordUpdate";
import PasswordForgot from "./component/layout/user/PasswordForgot";
import ResetPassword from "./component/layout/user/ResetPassword.js";
import Cart from "./component/layout/order/Cart.js";
import Shipping from "./component/layout/order/Shipping.js";
import ConfirmOrder from "./component/layout/order/ConfirmOrder.jsx";
import Payment from "./component/layout/order/Payment.jsx";
import PaymentSuccess from "./component/layout/order/PaymentSuccess.jsx";
import MyOrders from "./component/layout/order/MyOrders.jsx";
import OrderDetails from "./component/layout/order/OrderDetails.jsx";
import AdminProducts from "./component/layout/order/AdminProducts.jsx";

import axios from "axios";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loader from "./component/layout/utils/Loader";
import AdminDash from "./component/layout/Admin/AdminDash";
const stripePromise = loadStripe(
  "pk_test_51NnNOvSFuTHP5molcpAQuWNXU5TOls5mRUcwxM2pMtCrzISqN1n5S2Cy8kl2iPKhgSXPui6zXZmdwJqPZZgsfTcn008bgRrpF3"
);

function App() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  // const [stripeApiKey, setStripeApiKey] = useState("");

  // const getStripeApiKey = async () => {
  //   const { data } = await axios.get("/api/v1/stripeapikey");
  //   setStripeApiKey(data.stripeApiKey);
  // };
  // console.log(stripeApiKey);
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    // getStripeApiKey();
  }, []);

  return (
    <Router>
      <ButtonState>
        <Header BrandName="NANDI" />
        {isAuthenticated && !loading && <UserOptions user={user} />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<AllProducts />} />
          <Route path="/products/:keyword" element={<AllProducts />} />
          <Route exact path="/search" element={<Search />} />

          <Route exact path="/login" element={<Login />} />
          <Route exact path="/account" element={<Profile />} />
          <Route exact path="/account/update" element={<ProfileUpdate />} />
          <Route exact path="/password/update" element={<PasswordUpdate />} />
          <Route exact path="/password/forgot" element={<PasswordForgot />} />

          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/shipping" element={<Shipping />} />
          <Route exact path="/coupons" element={<Coupons />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />

          <Route
            exact
            path="/process/payment"
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />
          <Route exact path="/success" element={<PaymentSuccess />} />
          <Route exact path="/orders" element={<MyOrders />} />
          <Route exact path="/loading" element={<Loader />} />

          <Route exact path="/order/:id" element={<OrderDetails />} />

          <Route exact path="admin/dashboard" element={<AdminDash />} />

          <Route exact path="admin/products" element={<AdminProducts />} />
        </Routes>
      </ButtonState>
    </Router>
  );
}

export default App;
