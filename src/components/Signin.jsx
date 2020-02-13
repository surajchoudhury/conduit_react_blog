import React from "react";
import { TiSocialFacebook } from "react-icons/ti";
import { FaGooglePlusG } from "react-icons/fa";
import { TiSocialLinkedin } from "react-icons/ti";
import { AiOutlineMail } from "react-icons/ai";
import { FiLock, FiEyeOff, FiEye } from "react-icons/fi";
import { Link, withRouter } from "react-router-dom";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
      visible: false
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSignin = event => {
    event.preventDefault();
    fetch("/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(data => data.json())
      .then(data => {
        if (data.success) {
          this.props.history.push("/");
          localStorage.setItem("token", data.token);
          this.props.isUpdated(true);
          this.props.isLogged(true);
        } else {
          this.setState({ message: data.message });
        }
      });
  };
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
          <form className="create_account_form" onSubmit={this.handleSignin}>
            <div className="input_signin_container">
              <input
                className="input_signin"
                type="email"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
              />
              <AiOutlineMail className="input_logo" />
            </div>
            <div className="input_signin_container">
              <input
                className="input_signin"
                type={this.state.visible ? `text` : `password`}
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
              />
              <FiLock className="input_logo" />
              {this.state.password ? (
                <FiEye
                  className={!this.state.visible ? `eye` : `eyeOff`}
                  onClick={() => this.setState({ visible: true })}
                />
              ) : null}
              {this.state.password ? (
                <FiEyeOff
                  className={this.state.visible ? `eyeon` : `eyeOff`}
                  onClick={() => this.setState({ visible: false })}
                />
              ) : null}
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

export default withRouter(Signin);
