import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import Nav from "../Component/NavComponent";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../Redux/productSlice";
import Loader from "../Component/Loader";
import Product from "../Component/Product";
import ProductModal from "../Component/SingleProductModel";
import gsap from "gsap";
import toast from "react-hot-toast";

const HomePage = () => {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { products } = useSelector((state) => state.product);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFiltered, setShowFiltered] = useState(false);

  const gridRef = useRef(null);

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((response) => {
        const data = response.data;
        dispatch(setProducts(data));
        setFilteredProducts(data);
        setShowFiltered(true);
        const uniqueCategories = [
          "All",
          ...new Set(data.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && gridRef.current && showFiltered) {
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
  }, [loading, filteredProducts, showFiltered]);

  const handleFilter = () => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) => p.category === selectedCategory)
      );
      toast.success(`Filtered by category - ${selectedCategory.toUpperCase()}`);
    }
    setShowFiltered(true);
  };

  return (
    <div>
      <Nav />

      <div className="   text-[#1a202c] flex justify-center items-center gap-4 my-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="h-fit rounded shadow-sm"
          style={{ padding: "0.5rem 1rem" }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>
        <button
          onClick={handleFilter}
          style={{ padding: "0.5rem 1rem", margin: "1rem 0" }}
          className="bg-blue-600 text-white  rounded hover:bg-blue-700 transition"
        >
          Filter
        </button>
      </div>

      {/* Product Grid */}
      <div
        ref={gridRef}
        className="flex flex-wrap gap-[1rem] justify-center w-screen h-fit"
        style={{ padding: "0.2rem" }}
      >
        {loading ? (
          <Loader />
        ) : showFiltered ? (
          filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Product
                key={product.id}
                product={product}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">No products found.</p>
          )
        ) : null}
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
