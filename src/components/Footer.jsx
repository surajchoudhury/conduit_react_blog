import React from "react";
// import {GoMarkGithub} from 'react-icons/go';
import {
  FaGithub,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaTwitter
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <section className="footer_contents">
        <div className="creator_details">
          <figure className="creator_avatar_container">
            <img
              className="creator_avatar"
              src="https://avatars3.githubusercontent.com/u/51029167?s=400&u=77a915a9a09ae59ca7482ce88975c00fb1b0d9e4&v=4"
              alt="avatar"
            />
          </figure>
          <small className="creator_name">Suraj kumar choudhury</small>
        </div>
        <small className="created_at">@AltCampus</small>
        <div className="social_medias">
          <a
            href="https://github.com/itzsunny/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaGithub className="social_link" />
          </a>
          <a
            href="https://www.facebook.com/suraj.choudhury.735"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaFacebook className="social_link" />
          </a>
          <a
            href="https://www.linkedin.com/in/suraj-kumar-choudhury-53661b159/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaLinkedin className="social_link" />
          </a>
          <a
            href="https://www.instagram.com/itz_sunny_007_/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaInstagram className="social_link" />
          </a>
          <a
            href="https://twitter.com/itz_sunny007"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaTwitter className="social_link" />
          </a>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
