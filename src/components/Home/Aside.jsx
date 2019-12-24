import React from "react";

const Aside = props => {
  return (
    <section className="aside_container">
      <div className="aside_sub_container">
        {props.logged || localStorage.token ? (
          <section className="aside_profile_container">
            <div className="aside_profile_pic">
              <img
                className="aside_profile"
                src={props.profile.avatar}
                alt=""
              />
            </div>
            <p className="aside_user_name">{props.profile.username}</p>
            <p className="aside_user_description">
              {props.profile.bio ? props.profile.bio : `Add a bio about you`}
            </p>
          </section>
        ) : (
          ""
        )}
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
