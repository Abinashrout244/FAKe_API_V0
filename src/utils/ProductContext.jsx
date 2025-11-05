import { createContext } from "react";
import { useEffect, useState } from "react";

export const ProductContext = createContext();
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [theme, setTheme] = useState("Light");
  const [category, setCategory] = useState("all");
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const data = await fetch("https://fakestoreapi.com/products");
    const json = await data.json();
    console.log(json);

    setProducts(json);
    setFilterProducts(json);
  };
  const handleSearch = (search) => {
    const result = products.filter((text) => {
      return text?.title?.toLowerCase()?.includes(search?.toLowerCase());
    });
    setFilterProducts(result);
  };

  const toggleTheme = () => {
    return setTheme((prev) => {
      return prev == "Light" ? "Dark" : "Light";
    });
  };

  const handleCategory = (seelctcatagory) => {
    setCategory(seelctcatagory);
    if (seelctcatagory === "all") {
      setFilterProducts(products);
    } else {
      const filtered = products.filter(
        (item) => item.category === seelctcatagory
      );
      setFilterProducts(filtered);
    }
  };
  return (
    <ProductContext.Provider
      value={{
        filterProducts,
        handleSearch,
        products,
        toggleTheme,
        theme,
        category,
        handleCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
