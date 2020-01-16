import React from "react";
import { FaHashtag } from "react-icons/fa";

const Aside = props => {
  return (
    <aside className="aside_container">
      <div className="aside_sub_container">
        {props.logged ? (
          <section className="aside_profile_container">
            <div className="aside_profile_pic">
              <img
                className="aside_profile"
                src={props.profile && props.profile.avatar}
                alt=""
              />
            </div>
            <p className="aside_user_name">
              {props.profile && props.profile.username}
            </p>
            <p className="aside_user_description">
              {props.profile && props.profile.bio
                ? props.profile.bio
                : `Add a bio ...`}
            </p>
          </section>
        ) : (
          ""
        )}
        <div className="tags_main_container">
          <p className="popular_tags">Popular Tags</p>
          <ul className="tags_container">
            {props.tag &&
              props.tag.map(tag => (
                <li
                  className="tag"
                  onClick={() => props.articlesByTags(tag.body)}
                >
                  <span className="hash_tag_small">
                    <FaHashtag />
                  </span>
                  {tag.body}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
