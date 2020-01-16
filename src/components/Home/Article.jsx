import React from "react";
import Loader from "./Loader";
import { Link, withRouter } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdHeartDislike } from "react-icons/io";

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      follow: false,
      unfollow: false
    };
  }

  componentDidMount() {
    fetch(
      `http://localhost:3000/api/v1/articles/${this.props.match.params.slug}`
    )
      .then(res => res.json())
      .then(article => {
        this.setState({ article });
        this.props.singleArticle(article);
      });
  }

  handleFollow = () => {
    let authorName =
      this.state.article.author && this.state.article.author.username;
    fetch(`http://localhost:3000/api/v1/profiles/${authorName}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ follow: true, unfollow: false });
        this.props.isUpdated(true);
        if (this.state.follow) {
          fetch(
            `http://localhost:3000/api/v1/articles/${this.props.match.params.slug}`
          )
            .then(res => res.json())
            .then(article => {
              this.setState({ article });
            });
        }
      });
  };

  handleUnfollow = () => {
    let authorName =
      this.state.article.author && this.state.article.author.username;
    fetch(`http://localhost:3000/api/v1/profiles/${authorName}/follow`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ unfollow: true, follow: false });
        this.props.isUpdated(true);
        if (this.state.unfollow) {
          fetch(
            `http://localhost:3000/api/v1/articles/${this.props.match.params.slug}`
          )
            .then(res => res.json())
            .then(article => {
              this.setState({ article });
            });
        }
      });
  };

  favoriteArticle = () => {
    fetch(
      `http://localhost:3000/api/v1/articles/${this.props.match.params.slug}/favorite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token
        }
      }
    )
      .then(res => res.json())
      .then(favorited => {
        if (favorited.success) {
          fetch(
            `http://localhost:3000/api/v1/articles/${this.props.match.params.slug}`
          )
            .then(res => res.json())
            .then(article => {
              this.props.isUpdated(true);
              this.setState({ article });
            });
        }
      });
  };

  unfavoriteArticle = () => {
    fetch(
      `http://localhost:3000/api/v1/articles/${this.props.match.params.slug}/favorite`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token
        }
      }
    )
      .then(res => res.json())
      .then(unfavorited => {
        if (unfavorited.success) {
          fetch(
            `http://localhost:3000/api/v1/articles/${this.props.match.params.slug}`
          )
            .then(res => res.json())
            .then(article => {
              this.props.isUpdated(true);
              this.setState({ article });
            });
        }
      });
  };

  deleteArticle = () => {
    fetch(
      `http://localhost:3000/api/v1/articles/${this.props.match.params.slug}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.props.isUpdated(true);
          this.props.history.push("/");
        }
      });
  };

  render() {
    return (
      <>
        {this.state.article ? (
          <article className="single_article_container">
            <section className="single_article_wrapper">
              <p className="sigle_article_title">{this.state.article.title}</p>
              <p className="sigle_article_description">
                {this.state.article.description}
              </p>

              <div className="single_article_user_info_container">
                <Link to="/usersprofile">
                  <figure className="user_info_avatar_container">
                    <img
                      className="avatar"
                      src={
                        this.state.article.author &&
                        this.state.article.author.avatar
                      }
                      alt=""
                    />
                  </figure>
                </Link>

                <div className="single_article_info_container">
                  <p className="single_article_username">
                    <section className="single_article_username_container">
                      <div>
                        <Link
                          to={
                            this.props.profile._id ===
                            this.state.article.author._id
                              ? `/profile`
                              : `/usersprofile`
                          }
                        >
                          <span className="single_article_authorname">
                            {this.state.article.author.username}
                          </span>
                        </Link>
                        {this.props.profile &&
                        this.props.profile._id !==
                          this.state.article.author._id &&
                        localStorage.token ? (
                          <span
                            className={
                              !this.state.article.author.followerUsers.includes(
                                this.props.profile && this.props.profile._id
                              )
                                ? `follow`
                                : `unfollow`
                            }
                            onClick={this.handleFollow}
                          >
                            Follow
                          </span>
                        ) : (
                          ""
                        )}

                        <span
                          className={
                            this.state.article.author.followerUsers.includes(
                              this.props.profile && this.props.profile._id
                            )
                              ? `followingUser`
                              : `unfollow`
                          }
                          onClick={this.handleUnfollow}
                        >
                          Following
                        </span>
                      </div>

                      {this.props.profile &&
                      this.props.profile._id ===
                        this.state.article.author._id ? (
                        <ul className="options_single_article">
                          <li>•••</li>
                          <ul className="article_edit_delete_ul">
                            <Link to="/updatearticle">
                              <li className="edit_article">
                                <MdEdit />
                              </li>
                            </Link>

                            <li
                              className="delete_article"
                              onClick={this.deleteArticle}
                            >
                              <MdDelete />
                            </li>
                          </ul>
                        </ul>
                      ) : (
                        <div className="favorite_icon_container">
                          {this.state.article.favorites.includes(
                            this.props.profile && this.props.profile._id
                          ) ? (
                            <section>
                              {localStorage.token ? (
                                <span
                                  className="favorite_article"
                                  onClick={this.unfavoriteArticle}
                                >
                                  <IoMdHeartDislike />
                                </span>
                              ) : (
                                ""
                              )}
                            </section>
                          ) : (
                            <section>
                              {localStorage.token ? (
                                <span
                                  className="favorite_article"
                                  onClick={this.favoriteArticle}
                                >
                                  <MdFavoriteBorder />
                                </span>
                              ) : (
                                ""
                              )}
                            </section>
                          )}
                        </div>
                      )}
                    </section>
                  </p>

                  <p className="single_article_date">
                    {new Date().toDateString()}
                  </p>
                </div>
              </div>

              <div className="single_article_image_container">
                <img
                  className="single_article_image"
                  src={this.state.article.image}
                  alt=""
                />
              </div>
              <p className="single_article_body">{this.state.article.body}</p>
              <hr className="hr_line_single_article" />
              <Link to={`${this.props.location.pathname}/comments`}>
                <div className="see_comments_conatiner">
                  <span className="see_comments">
                    {this.state.article.comments.length
                      ? `See comments`
                      : `No comments yet`}
                  </span>
                  <span className="comments_count">
                    (
                    {this.state.article.comments.length
                      ? this.state.article.comments.length
                      : `Add a comment`}
                    )
                  </span>
                </div>
              </Link>
            </section>
          </article>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

export default withRouter(Article);
