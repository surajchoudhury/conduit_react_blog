import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";


//relative imports

import UserArticles from "./UserArticles";
import Popular from "./Popular";
import Following from "./Following";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      view: "myarticles",
      followView: "default"
    };
  }

  handleChange = data => {
    this.setState({ view: data });
  };

  handleFollowView = view => {
    this.setState({ followView: view });
  };

  handleView = () => {
    switch (this.state.view) {
      case "myarticles":
        return (
          <>
            {this.props.profile.article && this.props.profile.article.length ? (
              this.props.profile.article.map(article => (
                <UserArticles {...article} />
              ))
            ) : (
              <p className="no_articles_yet">No articles are here... yet.</p>
            )}
          </>
        );
      case "favoritedarticles":
        return (
          <>
            {this.props.profile && this.props.profile.favorited.length ? (
              this.props.profile.favorited.map(article => (
                <UserArticles {...article} />
              ))
            ) : (
              <p className="no_articles_yet">No favorited articles... yet.</p>
            )}
          </>
        );
      default:
        break;
    }
  };

  handleFollowViewAll = () => {
    switch (this.state.followView) {
      case "default":
        return "";
      case "following":
        return (
          <>
            {this.props.profile &&
            this.props.profile.following &&
            this.props.profile.following.length
              ? this.props.profile.following.map(user => (
                  <Following
                    {...user}
                    profile={this.props.profile}
                    isUpdated={this.props.isUpdated}
                  />
                ))
              : ""}
          </>
        );
      case "followers":
        return (
          <>
            {this.props.profile &&
            this.props.profile.followers &&
            this.props.profile.followers.length
              ? this.props.profile.followers.map(user => (
                  <Following
                    {...user}
                    profile={this.props.profile}
                    isUpdated={this.props.isUpdated}
                  />
                ))
              : ""}
          </>
        );
      default:
        return "";
    }
  };

  render() {
    let count = 0;
    return (

      <section className="profile_container">
        <div className="profile_bg_top">
          <div className="relative_profile">
            <section className=" sub_profile_container">
              <div className="edit_profile">
                <Link to="/settings">
                  <p className="edit_icon">
                    <FiEdit2 />
                  </p>
                </Link>
              </div>
              <div className="aside_profile_pic profile_pic_container">
                <img
                  className="aside_profile"
                  src={this.props.profile && this.props.profile.avatar}
                  alt=""
                />
              </div>
              <p className="username">
                {this.props.profile && this.props.profile.username}
              </p>
              <p className="user_description">
                {this.props.profile && this.props.profile.bio
                  ? this.props.profile.bio
                  : `Add a bio about you`}
              </p>
              <div className="following_container">
                <p
                  className={
                    this.state.followView === "following"
                      ? "following following_active"
                      : "following"
                  }
                  onClick={() => this.handleFollowView("following")}
                >
                  <span className="following_count">
                    {this.props.profile &&
                      this.props.profile.following &&
                      this.props.profile.following.length}
                  </span>
                  Following
                </p>
                <p
                  className={
                    this.state.followView === "followers"
                      ? "followers followers_active"
                      : "followers"
                  }
                  onClick={() => this.handleFollowView("followers")}
                >
                  <span className="followers_count">
                    {this.props.profile && this.props.profile.followers
                      ? this.props.profile.followers.length
                      : 0}
                  </span>
                  {this.props.profile.followers &&
                  this.props.profile.followers.length <= 1
                    ? `Follower`
                    : `Followers`}
                </p>
              </div>
            </section>
          </div>
        </div>
        <section
          className={
            this.state.followView === "following" ||
            this.state.followView === "followers"
              ? "following_user_container_enable"
              : "following_user_container following_user_container_disable"
          }
        >
          <div className="following_user_subcontainer">
            <p
              className="back_arrow_following_user"
              onClick={() => this.handleFollowView("default")}
            >
              <IoIosArrowBack />
            </p>
            {this.handleFollowViewAll()}
          </div>
        </section>
        <article className="profile_feeds_container">
          <div className="feeds_sub_container">
            <p
              className={
                this.state.view === "myarticles"
                  ? `my_article`
                  : `favorited_article`
              }
              onClick={() => this.handleChange("myarticles")}
            >
              My Articles
            </p>
            <p
              className={
                this.state.view === "favoritedarticles"
                  ? `my_article`
                  : `favorited_article`
              }
              onClick={() => this.handleChange("favoritedarticles")}
            >
              Favorited Articles
            </p>
          </div>
        </article>
        <div className="user_article_container">
          <div className="user_articles_container">{this.handleView()}</div>
          <div className="popular_container">
            <p className="popular_text">Popular on Conduit</p>
            <div className="popular_overflow">
              {this.props.articles &&
                this.props.articles
                  .filter(article => article.favorites.length > 2 && article)
                  .sort(
                    (like1, like2) =>
                      like2.favorites.length - like1.favorites.length
                  )
                  .map(article => <Popular {...article} count={++count} />)}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Profile;
