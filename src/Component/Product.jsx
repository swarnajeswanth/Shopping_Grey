import React, { useState } from "react";
import { setCart } from "../Redux/productSlice";
import { useDispatch } from "react-redux";
const Product = ({ product, setSelectedProduct, selectedProduct }) => {
  const [showFull, setShowFull] = useState(false);
  const dispatch = useDispatch();
  const [addToCart, setAddToCart] = useState(false);
  const toggleShow = () => setShowFull((prev) => !prev);
  const descriptionPreview = product.description.slice(0, 100);
  const handleAddToCart = () => {
    console.log("handleaddtocart");
    const { id, title, price, image } = product;
    dispatch(setCart({ id, title, price, image, quantity: 1 }));
    setAddToCart(true);
  };

  const styles = {
    card: {
      maxWidth: "300px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 0 12px rgba(0, 0, 0, 0.1)",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      justifyContent: "space-between",
      position: "relative", // required for heart icon positioning
    },
    image: {
      height: "180px",
      width: "100%",
      objectFit: "contain",
      borderRadius: "4px",
      cursor: "pointer",
    },
    title: {
      fontSize: "0.8rem",
      fontWeight: "bold",
    },
    description: {
      fontSize: "0.6rem",
      color: "#666",
      minHeight: "60px",
    },
    toggleLink: {
      fontSize: "0.6rem",
      color: "#15803d",
      cursor: "pointer",
      marginTop: "2px",
    },
    meta: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "0.7rem",
      color: "#888",
    },
    bottom: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "4px",
    },
    price: {
      color: "#16a34a",
      fontWeight: "bold",
      fontSize: "0.7rem",
    },
    button: {
      backgroundColor: "#16a34a",
      fontSize: "0.7rem",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    heart: {
      position: "absolute",
      top: "10px",
      right: "14px",
      fontSize: "1rem",
      color: "#e11d48",
      cursor: "pointer",
    },
  };

  return (
    <div
      style={styles.card}
      //
      className="hover:scale-105"
    >
      <span style={styles.heart}>❤️</span>
      <img
        onClick={() => setSelectedProduct(product)}
        src={product.image}
        alt={product.title}
        style={styles.image}
      />
      <h2 style={styles.title}>{product.title}</h2>
      <p style={styles.description}>
        {showFull ? product.description : descriptionPreview + "..."}
      </p>
      {product.description.length > 100 && (
        <span onClick={toggleShow} style={styles.toggleLink}>
          {showFull ? "See Less" : "See More"}
        </span>
      )}
      <div style={styles.meta}>
        <span>
          {" "}
          <b>Category:</b> {product.category}
        </span>
        <span>
          <b>Rating:</b> ⭐ {product.rating?.rate} ({product.rating?.count})
        </span>
      </div>
      <div style={styles.bottom}>
        <span style={styles.price}>${product.price}</span>
        <button
          disabled={addToCart}
          onClick={handleAddToCart}
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#15803d")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#16a34a")}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
