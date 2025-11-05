import Header from "./components/Header";
import Body from "./components/Body";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";

import ProductPage from "./components/ProductPage";
import Cart from "./components/Cart";
function App() {
  return (
    <>
      <Header />
      <Outlet />
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
    ],
  },
]);

const AppLayout = () => <RouterProvider router={approuter} />;

export default AppLayout;
