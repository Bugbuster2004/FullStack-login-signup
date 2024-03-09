import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "./AuthComp";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      try {
        const result = await axios.post("http://localhost:3001/login", {
          email,
          password,
        });
        const { user, auth } = result.data;
        if (auth) {
          localStorage.setItem("authToken", auth);
          console.log(auth);
          login();
          navigate("/dashboard");
        }
      } catch (err) {
        console.log(err);
      }
    }

    setIsValidated(true);

    // Reset form fields
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container mt-5">
      <div className="card bg-light">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Login</h2>
          <form
            onSubmit={handleLogin}
            className={isValidated ? "was-validated" : ""}
            noValidate
          >
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                Email:
              </label>
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="invalid-feedback">
                Please enter a valid email.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <FontAwesomeIcon icon={faLock} className="me-2" />
                Password:
              </label>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="invalid-feedback">
                Please enter your password.
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
