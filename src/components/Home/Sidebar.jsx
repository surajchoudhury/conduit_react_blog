import React from "react";
import { FaHome } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <section className="sidebar">
      <div className="sidebar_logo_container">
        <div className="conduit_logo_container">
          <img className="conduit_logo" src="images/conduit.png" alt="" />
        </div>
      </div>
      <aside className="sidebar_icons_container">
        <Link to="/" className="link">
          <div className="sidebar_icon_container">
            <FaHome className="sidebar_icon" />
            <p className="sidebar_icon_text ">Home</p>
          </div>
        </Link>
        <Link to="/signin">
          <div className="sidebar_icon_container">
            <IoMdLogIn className="sidebar_icon sign_in_icon" />
            <p className="sidebar_icon_text">Sign In</p>
          </div>
        </Link>
        <Link to="/signup">
          <div className="sidebar_icon_container">
            <FaRegUserCircle className="sidebar_icon" />
            <p className="sidebar_icon_text">Sign Up</p>
          </div>
        </Link>
        <div className="sidebar_icon_container">
          <FiEdit className="sidebar_icon" />
          <p className="sidebar_icon_text">Post</p>
        </div>
        <div className="sidebar_icon_container">
          <FiSettings className="sidebar_icon settings_icon" />
          <p className="sidebar_icon_text">Settings</p>
        </div>
      </aside>
    </section>
  );
};

export default Sidebar;
