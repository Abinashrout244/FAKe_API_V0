import Header from "./layout/Header";
import HomePage from "./pages/HomePage";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import Footer from "./layout/Footer";
import MobileBottomNav from "./layout/MobileBottomNav";
import OrderPage from "./pages/OrderPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import ShowQR from "./components/home/ShowQR";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <MobileBottomNav />
    </>
  );
}

const approuter = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/product/:id", element: <ProductPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/order", element: <OrderPage /> },
      { path: "/track-order", element: <TrackOrderPage /> },
      { path: "/qr", element: <ShowQR /> },
    ],
  },
]);

const AppLayout = () => <RouterProvider router={approuter} />;

export default AppLayout;
