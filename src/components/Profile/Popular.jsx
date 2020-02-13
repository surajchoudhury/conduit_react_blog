import React from "react";
import { Link } from "react-router-dom";

const Popular = props => {
  return (
    <Link to={`/articles/${props.slug}`}>
      <div className="popular_feeds_container">
        <p className="popular_counts">{`${props.count < 10 ? 0 : ""}${
          props.count
        }`}</p>
        <div>
          <p className="popular_title">{props.title}</p>
          <p className="popular_author_name">
            {props.author && props.author.username}
          </p>
      <date className="popular_date">{new Date(props.createdAt).toDateString()}</date>
        </div>
      </div>
    </Link>
  );
};

export default Popular;
