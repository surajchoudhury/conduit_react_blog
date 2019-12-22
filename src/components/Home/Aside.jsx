import React from "react";

const Aside = props => {
  return (
    <section className="aside_container">
      <div className="aside_sub_container">
        <div className="tags_main_container">
          <p className="popular_tags">Popular Tags</p>
          <ul className="tags_container">
            {props.tag &&
              props.tag.map(tag => <li className="tag">{tag.body}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Aside;
