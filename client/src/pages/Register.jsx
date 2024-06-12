import React, { useState } from "react";
import "../styles/signup.css";
import axios from "axios";
import RegisterSection from "../components/RegisterSection";
import LRSide from "../components/LRSide";


axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Register() {
  return (
    <div class="signup">
        <div class="registerSection">
        <RegisterSection/>
        </div>
        <div class="otherSection">
        <LRSide/>
        </div>
        
    </div>
  );
}

export default Register;