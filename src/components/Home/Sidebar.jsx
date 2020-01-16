import React from "react";
import { FaHome } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = props => {
  return (
    <section className="sidebar">
      <div className="sidebar_logo_container">
        <div className="conduit_logo_container">
          <img className="conduit_logo" src="images/conduit.png" alt="" />
        </div>
      </div>
      <aside className="sidebar_icons_container">
        <Link to="/">
          <div
            className={
              props.menu === "home"
                ? `sidebar_icon_container sidebar_icon_container_active`
                : `sidebar_icon_container`
            }
            onClick={() => props.handleMenu("home")}
          >
            <FaHome className="sidebar_icon" />
            <p className="sidebar_icon_text ">Home</p>
          </div>
        </Link>
        {props.logged || localStorage.token ? (
          ""
        ) : (
          <Link to="/signin">
            <div
              className={
                props.menu === "signin"
                  ? `sidebar_icon_container sidebar_icon_container_active`
                  : `sidebar_icon_container`
              }
              onClick={() => props.handleMenu("signin")}
            >
              <IoMdLogIn className="sidebar_icon sign_in_icon" />
              <p className="sidebar_icon_text">Sign In</p>
            </div>
          </Link>
        )}
        <Link to={props.logged || localStorage.token ? `/profile` : `/signup`}>
          <div
            className={
              props.menu === "signup"
                ? `sidebar_icon_container sidebar_icon_container_active`
                : `sidebar_icon_container`
            }
            onClick={() => props.handleMenu("signup")}
          >
            <FaRegUserCircle className="sidebar_icon" />
            <p className="sidebar_icon_text">
              {props.logged || localStorage.token ? `Profile` : `Sign Up`}
            </p>
          </div>
        </Link>
        {props.logged || localStorage.token ? (
          <Link to="/newpost">
            {" "}
            <div
              className={
                props.menu === "post"
                  ? `sidebar_icon_container sidebar_icon_container_active`
                  : `sidebar_icon_container`
              }
              onClick={() => props.handleMenu("post")}
            >
              <FiEdit className="sidebar_icon" />
              <p className="sidebar_icon_text">Post</p>
            </div>
          </Link>
        ) : (
          ""
        )}

        {props.logged || localStorage.token ? (
          <Link to="/settings">
            <div
              className={
                props.menu === "settings"
                  ? `sidebar_icon_container sidebar_icon_container_active`
                  : `sidebar_icon_container`
              }
              onClick={() => props.handleMenu("settings")}
            >
              <FiSettings className="sidebar_icon settings_icon" />
              <p className="sidebar_icon_text">Setting</p>
            </div>
          </Link>
        ) : (
          ""
        )}
      </aside>
    </section>
  );
};

export default Sidebar;
