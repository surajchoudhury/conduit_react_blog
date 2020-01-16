import React from "react";
import { TiSocialFacebook } from "react-icons/ti";
import { FaGooglePlusG } from "react-icons/fa";
import { TiSocialLinkedin } from "react-icons/ti";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { FiLock, FiEyeOff, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      message: "",
      visible: false
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleSignUp = event => {
    event.preventDefault();
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.props.history.push("/signin");
        } else {
          this.setState({ message: data.message });
        }
      });
  };

  render() {
    return (
      <div className="signin_main_container">
        <div className="sign_in_container_signin">
          <p className="welcome_back">Welcome Back!</p>
          <p className="welcome_back_text">
            To keep connected With us please login with our Personl info
          </p>
          <Link to="signin">
            <button className="signin_button">SIGN IN</button>
          </Link>
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
          <p className="email_registration">
            or use your email for registration
          </p>
          <form className="create_account_form" onSubmit={this.handleSignUp}>
            <div className="input_signin_container">
              <input
                className="input_signin"
                type="text"
                placeholder="Name"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <AiOutlineUser className="input_logo" />
            </div>
            <div className="input_signin_container">
              <input
                className="input_signin"
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <AiOutlineMail className="input_logo" />
            </div>
            <div className="input_signin_container">
              <input
                className="input_signin"
                type={this.state.visible ? `text` : `password`}
                name="password"
                placeholder="Password"
                value={this.state.password}
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
              value="SIGN UP"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
