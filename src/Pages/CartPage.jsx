import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../Redux/productSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.product.cart);

  const total = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="bg-[#f0f4f8] text-[#1a202c]" style={styles.container}>
      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div style={styles.cartList}>
            {cart.map((item) => (
              <div key={item.id} style={styles.item}>
                <div style={styles.info}>
                  <img src={item.image} alt={item.title} style={styles.image} />
                  <div>
                    <h4>{item.title}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item))}
                  style={styles.removeBtn}
                >
                  ❌ Remove
                </button>
              </div>
            ))}
          </div>

          <h3 style={{ textAlign: "right" }}>Total: ${total}</h3>

          <div style={styles.actions}>
            <button
              onClick={() => dispatch(clearCart())}
              style={styles.clearBtn}
            >
              Clear Cart
            </button>
            <button style={styles.checkoutBtn}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    fontFamily: "sans-serif",
  },
  cartList: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
    paddingBottom: "10px",
    marginBottom: "10px",
  },
  info: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "contain",
  },
  removeBtn: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  clearBtn: {
    backgroundColor: "#9ca3af",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    color: "white",
  },
  checkoutBtn: {
    backgroundColor: "#16a34a",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    color: "white",
  },
};

export default CartPage;
