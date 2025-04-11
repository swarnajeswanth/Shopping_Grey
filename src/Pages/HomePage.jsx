import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import Nav from "../Component/NavComponent";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../Redux/productSlice";
import Loader from "../Component/Loader";
import Product from "../Component/Product";
import ProductModal from "../Component/SingleProductModel";
import gsap from "gsap";

const HomePage = () => {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { products } = useSelector((state) => state.product);

  const gridRef = useRef(null);

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((response) => {
        dispatch(setProducts(response.data));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    }
  }, [loading, products]);

  return (
    <div>
      <Nav />

      <div
        ref={gridRef}
        className="flex flex-wrap gap-[1rem] justify-center w-screen h-fit"
        style={{ padding: "0.2rem" }}
      >
        {loading ? (
          <Loader />
        ) : (
          products.map((product) => (
            <Product
              key={product.id}
              product={product}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          ))
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
