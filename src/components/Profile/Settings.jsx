import React from "react";
import { IoMdLogOut } from "react-icons/io";
import { MdUpdate } from "react-icons/md";
import { withRouter } from "react-router-dom";
import Loader from "../Home/Loader";

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      avatar: "",
      username: "",
      bio: "",
      email: "",
      updated: false
    };
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  componentDidMount() {
    fetch("/api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(user =>
        this.setState({
          avatar: user.avatar,
          username: user.username,
          bio: user.bio,
          email: user.email
        })
      );
  }

  handleSubmit = event => {
    event.preventDefault();
    fetch("/api/v1/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token
      },
      body: JSON.stringify({
        avatar: this.state.avatar,
        username: this.state.username,
        bio: this.state.bio,
        email: this.state.email
      })
    })
      .then(res => res.json())
      .then(user => {
        this.props.isUpdated(true);
        this.props.history.push("/");
        this.setState({ updated: true });
      });
  };
  handleLogout = () => {
    this.props.isLogged(false);
    this.props.isUpdated(false);
    localStorage.removeItem("token");
  };

  render() {
    return (
      <>
        {this.state.username ||
        this.state.email ||
        this.state.bio ||
        this.state.avatar ? (
          <section className="profile_container">
            <div className="profile_bg_top_settings">
              <div className="relative_profile_settings">
                <section className=" sub_profile_container_settings">
                  <div className="aside_profile_pic profile_pic_container">
                    <img
                      className="aside_profile"
                      src={this.state.avatar}
                      alt=""
                    />
                  </div>

                  <form className="settings_form" onSubmit={this.handleSubmit}>
                    <input
                      className="settings_input"
                      type="text"
                      name="avatar"
                      onChange={this.handleChange}
                      value={this.state.avatar}
                      placeholder="URL of profile picture"
                    />
                    <input
                      className="settings_input"
                      type="text"
                      name="username"
                      onChange={this.handleChange}
                      value={this.state.username}
                      placeholder="Username"
                    />
                    <textarea
                      className="settings_input"
                      name="bio"
                      id=""
                      cols="30"
                      rows="10"
                      onChange={this.handleChange}
                      value={this.state.bio}
                      placeholder="Short bio about you"
                    ></textarea>
                    <input
                      className="settings_input"
                      type="email"
                      name="email"
                      onChange={this.handleChange}
                      value={this.state.email}
                      placeholder="Email"
                    />
                    <input
                      className="settings_input"
                      type="password"
                      name="password"
                      onChange={this.handleChange}
                      value={this.state.password}
                      placeholder="New Password"
                    />
                    <div className="btn_container_settings">
                      <button className="submit_btn_settings" type="submit">
                        <MdUpdate />
                      </button>
                      <button
                        className="logout_btn_settings"
                        onClick={this.handleLogout}
                      >
                        <IoMdLogOut />
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </section>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

export default withRouter(Settings);
