import React, { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          console.log("LOGIN SUCCESS");
          navigate("/dashboard");
        }
        // Assuming your backend returns some token upon successful login
        // You can store the token in local storage or state for authentication
        // console.log("Login successful");
        // navigate("/dashboard");
      })
      .catch((err) => console.log(err));

    // Reset form fields after submission if needed
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account?</p>
      <Link to="/signup">Signup</Link>
    </div>
  );
}

export default Login;
