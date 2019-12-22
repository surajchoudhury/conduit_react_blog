import React from "react";

// Relative imports

import Articles from "./Articles";

const Middle = props => {
  return (
    <section className="middle">
      <div className="middle_sub_container">
        <p className="global_feed">Global Feed</p>
        <article className="articles_container">
          {props.articles &&
            props.articles.map(article => <Articles {...article} />)}
        </article>
      </div>
    </section>
  );
};

export default Middle;
