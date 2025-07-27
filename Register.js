import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });

      alert(response.data.message || "Registration Successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error in Registration!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>Register</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
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
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p style={styles.text}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
};

// 🌸 CSS-in-JS Styling
const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(135deg, rgb(240, 157, 185), rgb(243, 138, 171))",
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
    border: "2px solid #ff4081",
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
  buttonDisabled: {
    background: "#ccc",
    cursor: "not-allowed",
  },
  text: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#333",
  },
  link: {
    color: "#ff4081",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

// Button Hover Effect
styles.button[":hover"] = {
  background: "#ff1e65",
};

export default Register;
