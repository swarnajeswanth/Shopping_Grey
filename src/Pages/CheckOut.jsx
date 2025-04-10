import React from "react";

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

  const fakeCart = [
    { id: 1, title: "Product A", quantity: 2, price: 19.99 },
    { id: 2, title: "Product B", quantity: 1, price: 39.99 },
  ];

  const total = fakeCart
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  return (
    <div style={styles.container}>
      <h2>Checkout</h2>

      <div style={styles.section}>
        <h3>Shipping Details</h3>
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
        {fakeCart.map((item) => (
          <div key={item.id} style={styles.productCard}>
            <span>
              {item.title} x {item.quantity}
            </span>
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
