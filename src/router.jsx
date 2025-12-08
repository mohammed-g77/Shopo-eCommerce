import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";

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
      }
    ]
  }
]);

export default router;
