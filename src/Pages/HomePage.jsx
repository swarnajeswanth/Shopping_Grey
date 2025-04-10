import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Nav from "../Component/NavComponent";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../Redux/productSlice";
import Loader from "../Component/Loader";
import Product from "../Component/Product";
import ProductModal from "../Component/SingleProductModel";
const HomePage = () => {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { products } = useSelector((state) => state.product);
  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((response) => dispatch(setProducts(response.data)))
      .catch((error) => console.log(error));
    setLoading(false);
  }, []);
  return (
    <div>
      <Nav />
      <div
        className="flex flex-wrap gap-[1rem] justify-center w-screen h-fit "
        style={{ padding: "0.2rem" }}
      >
        {loading ||
          products.map((product) => (
            <Product
              key={product.id}
              product={product}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          ))}
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      {/* <Loader /> */}
    </div>
  );
};

export default HomePage;
