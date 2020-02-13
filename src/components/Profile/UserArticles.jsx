import React from "react";
import { Link } from "react-router-dom";

const UserArticles = props => {
  return (
    <Link to={`/articles/${props.slug}`} className="">
      <article className="user_article_container">
        <section className="user_article_section_left">
          <p>
            {props.tagList &&
              props.tagList
                .split(",")
                .map(tag => (
                  <span className="tag_articles">{tag.toUpperCase()}</span>
                ))}
          </p>
          <p className="article_title_small">{props.title}</p>
          <p className="article_desc_small">{props.description}</p>
          <div className="user_articles_user_info_container">
            <p className="author_name_small author_name_user">
              {props.author.username}
            </p>
            <p className="date_small">{new Date(props.createdAt).toDateString()}</p>
          </div>
        </section>
        <section className="user_article_section_right">
          <img
            className="user_article_section_right_img"
            src={props.image}
            alt=""
          />
        </section>
      </article>
    </Link>
  );
};

export default UserArticles;
