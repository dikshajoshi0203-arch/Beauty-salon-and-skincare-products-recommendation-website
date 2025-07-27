import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "diksha@gmail.com" && password === "diksha123") {
      alert("Login successful!");
      localStorage.setItem("isAdminAuthenticated", "true");

      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 100);
    } else {
      alert("Invalid credentials! Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>ADMIN LOGIN</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>LOGIN</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(135deg,rgb(240, 157, 185),rgb(243, 138, 171))",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formBox: {
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "350px",
  },
  heading: {
    color: "#ff4081",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "2px solidrgb(240, 109, 152)",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    transition: "0.3s",
  },
  button: {
    background: "#ff4081",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "12px",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    transition: "0.3s ease-in-out",
  },
};

styles.button[":hover"] = {
  background: "#ff1e65",
};

export default AdminLogin;
