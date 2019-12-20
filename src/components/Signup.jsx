import React from "react";
import { TiSocialFacebook } from "react-icons/ti";
import { FaGooglePlusG } from "react-icons/fa";
import { TiSocialLinkedin } from "react-icons/ti";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import {Link} from 'react-router-dom';

const Signup = () => {
  return (
    <div className="signin_main_container">
      <div className="sign_in_container_signin">
        <p className="welcome_back">Welcome Back!</p>
        <p className="welcome_back_text">
          To keep connected With us please login with our Personl info
        </p>
        <Link to="signin"><button className="signin_button">SIGN IN</button></Link>
      </div>
      <div className="sign_up_container_signin">
        <p className="create_account">Create Account</p>
        <div className="logo_container">
          <span className="facebook_logo">
            <TiSocialFacebook />
          </span>
          <span className="google_logo">
            <FaGooglePlusG />
          </span>
          <span className="linkedin_logo">
            <TiSocialLinkedin />
          </span>
        </div>
        <p className="email_registration">or use your email for registration</p>
        <form className="create_account_form">
          <div className="input_signin_container">
            <input className="input_signin" type="text" placeholder="Name" />
            <AiOutlineUser className="input_logo" />
          </div>
          <div className="input_signin_container">
            <input className="input_signin" type="email" placeholder="Email" />
            <AiOutlineMail className="input_logo" />
          </div>
          <div className="input_signin_container">
            <input
              className="input_signin"
              type="password"
              placeholder="Password"
            />
            <FiLock className="input_logo" />
          </div>
          <input
            type="submit"
            className="signin_button signup_button"
            value="SIGN UP"
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
