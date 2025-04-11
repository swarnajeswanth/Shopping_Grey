import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../Redux/productSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPrice = (product.price * quantity).toFixed(2);
  const { cart } = useSelector((state) => state.product);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleAddToCart = () => {
    const { id, title, price, image } = product;
    const existing = cart.find((item) => item.id === id);

    if (existing) {
      dispatch(
        setCart({
          id,
          title,
          price,
          image,
          quantity: existing.quantity + quantity,
        })
      );
    } else {
      dispatch(setCart({ id, title, price, image, quantity }));
    }

    onClose();
  };

  return (
    <div
      className="bg-[#f0f4f8] text-[#1a202c]"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#fff",
          width: "400px",
          padding: "20px",
          boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
          overflowY: "auto",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.4rem",
            color: "#999",
          }}
          aria-label="Close"
        >
          <AiOutlineClose />
        </button>

        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          {product.title}
        </h2>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "100%", height: "200px", objectFit: "contain" }}
        />
        <p style={{ margin: "1rem 0" }}>{product.description}</p>
        <p>
          Price: <strong>${product.price}</strong>
        </p>

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={{
            width: "60px",
            marginLeft: "10px",
            padding: "4px",
          }}
        />

        <p style={{ marginTop: "1rem" }}>
          Total: <strong>${totalPrice}</strong>
        </p>

        <div style={{ marginTop: "2rem", display: "flex", gap: "10px" }}>
          <button
            onClick={handleAddToCart}
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: "#16a34a",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "6px",
            }}
          >
            Add to Cart
          </button>
          <button
            onClick={() => {
              navigate("/checkout");
              onClose();
            }}
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: "#1d4ed8",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "6px",
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
