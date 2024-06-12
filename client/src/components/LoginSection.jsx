import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/signup.css";
import axios from "axios";
import toast from "react-hot-toast";
import loginImage from '../images/login.jpg';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function LoginSection() {
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = formDetails;
      if (!email || !password) {
        return toast.error("Input field should not be empty");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      }

      const { data } = await toast.promise(
        axios.post("/user/login", {
          email,
          password,
        }),
        {
          pending: "Logging in...",
          success: "Login successfully",
          error: "Invalid credentials",
          loading: "Logging user...",
        }
      );
      localStorage.setItem("token", data.token);
      return navigate("/chats");
    } catch (error) {
      return error;
    }
  };

  return (
      <div className="login-container flex-center">
        <h2>Hello Everyone , We are Unichat</h2>
        <p>Welcome to chitchat please login to your account.</p>
        <img src={loginImage} alt="Login" className="login-image" />
        <h2 className="form-heading">Login</h2>
        <form onSubmit={formSubmit} className="register-form">
          <label >Email:</label>
          <input
            type="email"
            name="email"
            class="form-input"
            placeholder="Enter your email"
            value={formDetails.email}
            onChange={inputChange}
          />
          <label>Password:</label>
            <input
              type="password"
              name="password"
              class="form-input"
              placeholder="Enter your password"
              value={formDetails.password}
              onChange={inputChange}
            />

          <button type="submit" className="btn form-btn">
            sign in
          </button>
        </form>
        <p>
          Not a user?{" "}
          <NavLink className="login-link" to={"/register"}>
            Register
          </NavLink>
        </p>
      </div>
  );
}

export default LoginSection;