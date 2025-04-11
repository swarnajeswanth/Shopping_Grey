import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../Redux/productSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const styles = {
    container: {
      maxWidth: "800px",
      padding: "0.5rem",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      fontFamily: "sans-serif",
    },
    section: {
      marginBottom: "0.5rem",
    },
    label: {
      fontWeight: "bold",
      display: "block",
      marginBottom: "0.25rem",
    },
    input: {
      width: "100%",
      padding: "0.5rem",
      marginBottom: "1rem",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    productCard: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.5rem",
      backgroundColor: "#fff",
      borderRadius: "6px",
      boxShadow: "0 0 4px rgba(0,0,0,0.1)",
      marginBottom: "0.5rem",
    },
    button: {
      padding: "0.75rem 1rem",
      backgroundColor: "#16a34a",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "0.8rem",
    },
  };
  const dispatch = useDispatch();
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const { cart } = useSelector((state) => state.product);
  const navigate = useNavigate();

  const [isMouseOver, setIsMouseOver] = useState(false);
  const total = cart
    ?.reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);
  useEffect(() => {
    console.log("cart", cart);
  }, [cart]);
  return (
    <div style={styles.container}>
      <h2
        className="text-2xl border rounded-lg w-fit  font-bold"
        style={{ padding: "0.25rem" }}
      >
        Checkout
      </h2>
      <div
        onClick={() => navigate(-1)}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          backgroundColor: "#f9f9f9",
          padding: "0.5rem",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          color: "#1d4ed8",
          fontWeight: "bold",
          borderBottom: "1px solid #ddd",
        }}
      >
        <AiOutlineArrowLeft />
        Back
      </div>

      <div style={styles.section}>
        <h3 className="text-2xl text-center font-bold"> Shipping Details</h3>
        <label style={styles.label}>Full Name</label>
        <input style={styles.input} type="text" placeholder="John Doe" />
        <label style={styles.label}>Address</label>
        <input style={styles.input} type="text" placeholder="123 Main Street" />
        <label style={styles.label}>City</label>
        <input style={styles.input} type="text" placeholder="City" />
        <label style={styles.label}>Zip Code</label>
        <input style={styles.input} type="text" placeholder="123456" />
      </div>

      <div style={styles.section}>
        <h3>Order Summary</h3>
        {cart?.map((item) => (
          <div key={item.id} style={styles.productCard}>
            <span style={{ flexGrow: 1, fontSize: "0.8rem" }}>
              {item.title} x {item.quantity}
            </span>

            <p
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "25px",
              }}
            >
              {(hoveredItemId === item.id || true) && ( // `true` here shows icon always
                <AiOutlineCloseCircle
                  onClick={() => dispatch(removeFromCart(item))}
                  style={{ color: "red" }}
                />
              )}
            </p>

            <span>${(item.quantity * item.price).toFixed(2)}</span>
          </div>
        ))}

        <div style={{ textAlign: "right", fontWeight: "bold" }}>
          Total: ${total}
        </div>
      </div>

      <button style={styles.button}>Place Order</button>
    </div>
  );
}
