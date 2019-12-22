import React from "react";

const Articles = props => {
  let date = new Date().toDateString();
  return (
    <article className="article_container">
      <div className="pictures_container">
        <img className="article_image" src={props.image} alt="" />
      </div>
      <div className="article_info">
        <p className="article_title_small">{props.title}</p>
        <p className="article_desc_small">{props.description}</p>
        <div className="user_info_small">
          <div className="avatar_small">
            <img className="avatar" src={props.author.avatar} alt="" />
          </div>
          <div className="author_info_small">
            <p className="author_name_small">{props.author.username}</p>
            <p className="date_small">{date}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Articles;
