import React, { useContext } from "react";
import Main from "./Main";
import Button from "./Button";
import { ProductContext } from "../utils/ProductContext";

const Body = () => {
  const { theme } = useContext(ProductContext);
  return (
    <div
      className={`flex flex-col gap-5 justify-center items-center  ${
        theme == "Light" ? "bg-white" : "bg-slate-900"
      }`}
    >
      <Button />
      <Main />
    </div>
  );
};

export default Body;
