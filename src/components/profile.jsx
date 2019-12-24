import React from "react";
import { FiEdit2 } from "react-icons/fi";

const Profile = props => {
  console.log(props);
  return (
    <section className="profile_container">
      <div className="profile_bg_top">
        <div className="relative_profile">
          <section className=" sub_profile_container">
            <div className="edit_profile">
              <p className="edit_icon">
                <FiEdit2 />
              </p>
            </div>
            <div className="aside_profile_pic profile_pic_container">
              <img
                className="aside_profile"
                src={props.profile.avatar}
                alt=""
              />
            </div>
            <p className="username">{props.profile.username}</p>
            <p className="user_description">
              {props.profile.bio ? props.profile.bio : `Add a bio about you`}
            </p>
            <div className="following_container">
              <p className="following">
                <span className="following_count">
                  {props.profile.following && props.profile.following.length}
                </span>
                Following
              </p>
              <p className="followers">
                <span className="followers_count">
                  {props.profile.followers && props.profile.followers.length}
                </span>
                {props.profile.followers && props.profile.followers.length <= 1
                  ? `Follower`
                  : `followers`}
              </p>
            </div>
          </section>
        </div>
      </div>
      <article className="profile_feeds_container">
        <div className="feeds_sub_container">
          <p className="my_article">My Articles</p>
          <p className="favorited_article">Favorited Articles</p>
        </div>
      </article>
    </section>
  );
};

export default Profile;
