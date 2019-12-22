import React from "react";
import { TiSocialFacebook } from "react-icons/ti";
import { FaGooglePlusG } from "react-icons/fa";
import { TiSocialLinkedin } from "react-icons/ti";
import { AiOutlineMail } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }
  render() {
    return (
      <div className="signin_main_container signup_main_container">
        <div className="sign_in_container_signin sign_up_container_signup">
          <p className="welcome_back">Hello Friend!</p>
          <p className="welcome_back_text">
            Enter your personal details and start journey with us
          </p>
          <Link to="/signup">
            <button className="signin_button">SIGN UP</button>
          </Link>
        </div>
        <div className="sign_up_container_signin sign_in_container_signin">
          <p className="create_account">Sign in to Conduit </p>
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
          <p className="email_registration">or use your email account</p>
          <form className="create_account_form">
            <div className="input_signin_container">
              <input
                className="input_signin"
                type="email"
                placeholder="Email"
              />
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
              value="SIGN IN"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Signin;
