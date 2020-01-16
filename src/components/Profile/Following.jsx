import React from "react";
import { Link } from "react-router-dom";

class Following extends React.Component {
  constructor() {
    super();
    this.state = {
      article: null
    };
  }

  handleFollow = () => {
    let authorName = this.props.username;
    fetch(`http://localhost:3000/api/v1/profiles/${authorName}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.props.isUpdated(true);
        }
      });
  };

  handleUnfollow = () => {
    let authorName = this.props.username;
    fetch(`http://localhost:3000/api/v1/profiles/${authorName}/follow`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.props.isUpdated(true);
        }
      });
  };

  render() {
    let { username, bio, avatar, _id } = this.props;
    return (
      <section className="following_single_container">
        <figure className="user_info_avatar_container">
          <img className="avatar" src={avatar} alt="" />
        </figure>
        <div className="follow_single_user_container">
          {localStorage.token ? (
            <Link to={`/usersprofile/${username}`}>
              <p
                className="follow_single_user_name"
                onClick={() => {
                  this.props.isUpdatedFollow &&
                    this.props.isUpdatedFollow(true);
                  this.props.followView && this.props.followView("default");
                }}
              >
                {username}
              </p>
            </Link>
          ) : (
            <p className="follow_single_user_name">{username}</p>
          )}
          <p className="follow_single_user_bio">{bio}</p>
          {this.props.profile &&
          this.props.profile._id &&
          localStorage.token &&
          this.props.profile._id !== _id ? (
            <span
              className={
                !this.props.profile.followingUsers.includes(_id)
                  ? `follow_single_follow`
                  : `unfollow`
              }
              onClick={this.handleFollow}
            >
              Follow
            </span>
          ) : (
            ""
          )}
          {localStorage.token ? (
            <span
              className={
                this.props.profile.followingUsers.includes(_id)
                  ? `follow_single_follow`
                  : `unfollow`
              }
              onClick={this.handleUnfollow}
            >
              Following
            </span>
          ) : null}
        </div>
      </section>
    );
  }
}

export default Following;
