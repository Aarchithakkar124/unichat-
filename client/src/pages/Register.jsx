import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";
import loginImage from '../images/login.jpg';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Register() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState("");
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    password: "",
    confpassword: "",
  });
  const navigate = useNavigate();

  const inputChange = async (e) => {
    const { name } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: e.target.value,
    });
  };

  const onUpload = (element) => {
    setLoading(true);
    if (element.type === "image/jpeg" || element.type === "image/png") {
      const data = new FormData();
      data.append("file", element);
      data.append("upload_preset", "zenstore");
      data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
      fetch(process.env.REACT_APP_CLOUDINARY_BASE_URL, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => setFiles(data.url.toString()));
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Please select an image in jpeg or png format");
    }
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      let { name, email, password, confpassword } = formDetails;
      if (!name || !email || !password || !confpassword) {
        return toast.error("Input field should not be empty");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      } else if (password !== confpassword) {
        return toast.error("Passwords do not match");
      }
      if (files === "") {
        setFiles(
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        );
      }
      const { data } = await toast.promise(
        axios.post("/user/register", {
          name,
          pic: files,
          email,
          password,
        }),
        {
          pending: "Registering user...",
          success: "User registered successfully",
          error: "Unable to register user",
          loading: "Registering user...",
        }
      );
      return navigate("/");
    } catch (error) {
      return error;
    }
  };

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <img src={loginImage} alt="Login" className="login-image" />
        <h2 className="form-heading">Sign Up</h2>
        <form
          onSubmit={formSubmit}
          className="register-form"
        >
          <div class="form-tile">
            <label class="form-label">Name:</label>
            <input
              type="text"
              name="name"
              class="form-input"
              placeholder="Enter your name"
              value={formDetails.name}
              onChange={inputChange}
            />
          </div>

          <div class="form-tile">
            <label class="form-label">Email:</label>
            <input
              type="email"
              name="email"
              class="form-input"
              placeholder="Enter your email"
              value={formDetails.email}
              onChange={inputChange}
            />
          </div>

          <div class="form-tile">
            <label class="form-label">Profile:</label>
            <input
              type="file"
              name="pic"
              class="form-input"
              onChange={(e) => {
                onUpload(e.target.files[0]);
              }}
            />
          </div>

          <div class="form-tile">
            <label class="form-label">Password:</label>
            <input
              type="password"
              name="password"
              class="form-input"
              placeholder="Enter your password"
              value={formDetails.password}
              onChange={inputChange}
            />
          </div>

          <div class="form-tile">
            <label class="form-label">Confirm Password:</label>
            <input
              type="password"
              name="confpassword"
              class="form-input"
              placeholder="Confirm your password"
              value={formDetails.confpassword}
              onChange={inputChange}
            />
          </div>          
          <button
            type="submit"
            className="btn form-btn"
            disabled={loading ? true : false}
          >
            sign up
          </button>
        </form>
        <p>
          Already a user?{" "}
          <NavLink
            className="login-link"
            to={"/"}
          >
            Log in
          </NavLink>
        </p>
      </div>
    </section>
  );
}

export default Register;
