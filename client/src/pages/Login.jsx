import React, { useState } from "react";
import "../styles/signup.css";
import axios from "axios";
import LoginSection from "../components/LoginSection";
import LRSide from "../components/LRSide";


axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Login() {
  return (
    <div class="signup">
        <div class="loginSection">
        <LoginSection/>
        </div>
        <div class="otherSection">
        <LRSide/>
        </div>
        
    </div>
  );
}

export default Login;