import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Reset validation
    setIsNameInvalid(false);
    setIsEmailInvalid(false);
    setIsPasswordInvalid(false);

    // form validation
    if (name === "") {
      setIsNameInvalid(true);
      return;
    }

    if (email === "") {
      setIsEmailInvalid(true);
      return;
    }

    if (password === "" || password.length < 8) {
      setIsPasswordInvalid(true);
      return;
    }

    axios
      .post("http://localhost:3001/register", { name, email, password })
      .then((result) => {
        navigate("/login");
      })
      .catch((err) => console.log(err));

    // Reset form fields
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container mt-5">
      <div className="card bg-light">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Signup</h2>
          <form onSubmit={handleSignup} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className={`form-control ${isNameInvalid ? "is-invalid" : ""} ${
                  name && !isNameInvalid ? "is-valid" : ""
                }`}
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {isNameInvalid && (
                <div className="invalid-feedback">Please enter your name.</div>
              )}
              {!isNameInvalid && name && (
                <div className="valid-feedback">Looks good!</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className={`form-control ${
                  isEmailInvalid ? "is-invalid" : ""
                } ${email && !isEmailInvalid ? "is-valid" : ""}`}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {isEmailInvalid && (
                <div className="invalid-feedback">
                  Please enter a valid email.
                </div>
              )}
              {!isEmailInvalid && email && (
                <div className="valid-feedback">Looks good!</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className={`form-control ${
                  isPasswordInvalid ? "is-invalid" : ""
                } ${password && !isPasswordInvalid ? "is-valid" : ""}`}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {isPasswordInvalid && (
                <div className="invalid-feedback">
                  Password should be at least 8 characters long.
                </div>
              )}
              {!isPasswordInvalid && password && (
                <div className="valid-feedback">Looks good!</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Signup
            </button>
          </form>
          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
