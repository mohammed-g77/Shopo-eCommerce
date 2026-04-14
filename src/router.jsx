import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import About from "./pages/about/About";
import Blog from "./pages/blog/Blog";

import ProductDetail from "./pages/product/ProductDetail";
import Shop from "./pages/shop/Shop";
import Contact from "./pages/contact/Contact";
import Profile from "./pages/profile/Profile";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import SendCode from "./pages/ForgotPassword/SendCode";
import ResetPassword from "./pages/ForgotPassword/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "checkout",
        element: <Checkout />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "shop",
        element: <Shop />
      },
      {
        path: "product/:id",
        element: <ProductDetail />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "blogs",
        element: <Blog />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "forgot-password",
        element: <SendCode />
      },
      {
        path: "reset-password",
        element: <ResetPassword />
      }
       
    ]
  }
]);

export default router;
