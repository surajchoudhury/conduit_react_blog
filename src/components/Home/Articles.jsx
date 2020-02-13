import React from "react";
import { Link } from "react-router-dom";
import { MdFavorite } from "react-icons/md";

const Articles = props => {
  let date = new Date(props.createdAt).toDateString();
  return (
    <Link to={`/articles/${props.slug}`} className="article_container">
      <article>
        <div className="pictures_container">
          <img
            className="article_image"
            src={props.image ? props.image : `images/conduit.jpeg`}
            alt=""
          />
        </div>
        <div className="article_info">
          <span className="favorite_count_container">
            <span className="favorite_count">
              <MdFavorite />
              <span className="count">{props.favorites.length}</span>
            </span>
          </span>
          <span className="tag_container">
            {props.tagList
              ? props.tagList
                  .split(",")
                  .map(tag => (
                    <span className="tag_articles">{tag.toUpperCase()}</span>
                  ))
              : ""}
          </span>
          <p className="article_title_small">{props.title}</p>
          <p className="article_desc_small">{props.description}</p>
          <div className="user_info_small">
            <div className="avatar_small">
              <img className="avatar" src={props.author.avatar} alt="" />
            </div>
            <div className="author_info_small">
              <p className="author_name_small">{props.author.username}</p>
              <date className="date_small">{date}</date>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Articles;
