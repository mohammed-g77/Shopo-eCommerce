import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";

import Register from "./components/Register";
import Login from "./components/Login";

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
        path: "register",
        element: <Register />
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  }
]);

export default router;
