import React from "react";

const Aside = () => {
  return (
    <section className="aside_container">
      <div className="aside_sub_container">
        <div className="tags_main_container">
          <p className="popular_tags">Popular Tags</p>
          <ul className="tags_container">
            {[
              "butt",
              "test",
              "dragons",
              "training",
              "tags",
              "as",
              "coffee",
              "animation",
              "baby",
              "flowers",
              "money",
              "cars",
              "caramel",
              "japan",
              "happiness",
              "sugar",
              "clean",
              "cookies",
              "sushi",
              "well"
            ].map(Tag => (
              <li className="tag">{Tag}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Aside;
