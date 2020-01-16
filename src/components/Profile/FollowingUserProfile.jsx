import React from "react";
import { withRouter } from "react-router-dom";
import Loader from "../Home/Loader";
import { IoIosArrowBack } from "react-icons/io";

//relative imports

import Popular from "./Popular";
import UserArticles from "./UserArticles";
import Following from "./Following";

class FollowingUserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      profile: null,
      isUpdated: false,
      view: "myarticles",
      followView: "default"
    };
  }

  componentDidMount() {
    fetch(
      `http://localhost:3000/api/v1/profiles/${this.props.match.params.username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token
        }
      }
    )
      .then(res => res.json())
      .then(profile => {
        if (profile.success) {
          this.setState({ profile: profile.profile });
        }
      });
  }

  isUpdated = value => {
    this.setState({ isUpdated: value }, () => this.handleUpdated());
  };
  handleUpdated = () => {
    if (this.state.isUpdated) {
      fetch(
        `http://localhost:3000/api/v1/profiles/${this.props.match.params.username}`,
        {
          headers: {
            "Content-type": "application/json",
            authorization: localStorage.token
          }
        }
      )
        .then(res => res.json())
        .then(profile => {
          if (profile.success) {
            this.setState({ profile: profile.profile });
          }
        });
    }
  };

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
            {this.state.profile && this.state.profile.article.length ? (
              this.state.profile.article.map(article => (
                <UserArticles
                  {...article}
                  profile={this.state.profile.article.author}
                />
              ))
            ) : (
              <p className="no_articles_yet">No articles are here... yet.</p>
            )}
          </>
        );
      case "favoritedarticles":
        return (
          <>
            {this.state.profile && this.state.profile.favorited.length ? (
              this.state.profile.favorited.map(article => (
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
            {this.state.profile &&
            this.state.profile.following &&
            this.state.profile.following.length
              ? this.state.profile.following.map(user => (
                  <Following
                    {...user}
                    profile={this.props.profile}
                    isUpdated={this.props.isUpdated}
                    isUpdatedFollow={this.isUpdated}
                    followView={this.handleFollowView}
                  />
                ))
              : ""}
          </>
        );
      case "followers":
        return (
          <>
            {this.state.profile &&
            this.state.profile.followers &&
            this.state.profile.followers.length
              ? this.state.profile.followers.map(user => (
                  <Following
                    {...user}
                    profile={this.props.profile}
                    isUpdated={this.props.isUpdated}
                    isUpdatedFollow={this.isUpdated}
                    followView={this.handleFollowView}
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
    console.log(this.state.profile && this.state.profile.favorited);
    return (
      <section className="profile_container">
        <div className="profile_bg_top">
          <div className="relative_profile">
            <section className=" sub_profile_container">
              {this.state.profile ? (
                <>
                  <div className="aside_profile_pic profile_pic_container">
                    <img
                      className="aside_profile"
                      src={this.state.profile.avatar}
                      alt=""
                    />
                  </div>
                  <p className="username">{this.state.profile.username}</p>
                  <p className="user_description">
                    {this.state.profile.bio
                      ? this.state.profile.bio
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
                        {this.state.profile.following.length}
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
                        {this.state.profile.followers
                          ? this.state.profile.followers.length
                          : 0}
                      </span>
                      {this.state.profile.followers.length <= 1
                        ? `Follower`
                        : `followers`}
                    </p>
                  </div>
                </>
              ) : (
                <Loader />
              )}
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
                  .map(article => <Popular {...article} count={++count} />)}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(FollowingUserProfile);
