import { createContext } from "react";
import { useEffect, useState } from "react";

export const ProductContext = createContext();
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const[filterName,setFilterName] = useState("Newest");
  const [theme, setTheme] = useState("Dark");
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



const sortedProducts = [...filterProducts].sort((a, b) => {
  if (filterName === "A-Z") {
    return a.title.localeCompare(b.title);
  }
  if (filterName === "Z-A") {
    return b.title.localeCompare(a.title);
  }
  if (filterName === "Price: Low to High") {
    return a.price - b.price;
  }
  if (filterName === "Price: High to Low") {
    return b.price - a.price;
  }
  if (filterName === "Rating") {
    return b.rating.rate - a.rating.rate;
  }
  return 0; // default (Newest)
});



  return (
    <ProductContext.Provider
      value={{
        filterProducts,
        sortedProducts,
        filterName,
        setFilterName,
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
