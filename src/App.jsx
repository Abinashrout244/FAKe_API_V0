import Header from "./components/Header";
import Body from "./components/Body";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import ProductPage from "./components/ProductPage";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";
import OrderPage from "./components/OrderPage";

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
      { path: "/", element: <Body /> },
      { path: "/product/:id", element: <ProductPage /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order", element: <OrderPage /> },
    ],
  },
]);

const AppLayout = () => <RouterProvider router={approuter} />;

export default AppLayout;
