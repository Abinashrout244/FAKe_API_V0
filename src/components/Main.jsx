import ProductCard from "./ProductCard";
import { ProductContext } from "../utils/ProductContext";
import { useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
const Main = () => {
  const { filterProducts, products, theme } = useContext(ProductContext);
  if (!products) return null;
  return products.length === 0 ? (
    <Shimmer />
  ) : (
    <div
      className={`flex flex-row flex-wrap gap-5 justify-center items-center pt-6 ${
        theme == "Light" ? "bg-white" : "bg-slate-900"
      }`}
    >
      {filterProducts.map((item) => {
        return (
          <Link to={"/product/" + item.id} key={item.id}>
            <ProductCard {...item} />
          </Link>
        );
      })}
    </div>
  );
};

export default Main;
