import React from "react";
import { withRouter } from "react-router-dom";
import { FaComment } from "react-icons/fa";
import { MdPublish } from "react-icons/md";

// relative import

import Loader from "./Loader";
import Comment from "./Comment";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
      commentText: ""
    };
  }
  componentDidMount() {
    fetch(
      `http://localhost:3000/api/v1/articles/${this.props.match.params.slug}`
    )
      .then(res => res.json())
      .then(comments => this.setState({ comments }));
  }

  onChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  handleState = updated => {
    this.setState({ comments: updated });
  };

  postComments = event => {
    event.preventDefault();
    fetch(`http://localhost:3000/api/v1/${this.props.match.url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token
      },
      body: JSON.stringify({
        body: this.state.commentText
      })
    })
      .then(res => res.json())
      .then(comment => {
        if (comment.success) {
          this.setState({ commentText: "" });
          fetch(
            `http://localhost:3000/api/v1/articles/${this.props.match.params.slug}`
          )
            .then(res => res.json())
            .then(comments => this.handleState(comments));
        }
      });
  };

  render() {
    let author = this.state.comments && this.state.comments.author._id;
    return (
      <>
        {this.state.comments ? (
          <article className="single_article_container">
            <div className="bg_top_comments">
              <section className="single_article_wrapper">
                <p className="showing_comments_text">Showing comments for:</p>
                <div className="article_info_comments">
                  <div className="article_title_container_comments">
                    <p className="article_title_comments">
                      {this.state.comments && this.state.comments.title}
                    </p>
                    <p className="comment_logo">
                      <FaComment />
                      <span className="comment_count">
                        {this.state.comments && this.state.comments.comments
                          ? this.state.comments.comments.length
                          : 0}
                      </span>
                    </p>
                  </div>
                  <p className="author_comment">
                    {this.state.comments && this.state.comments.author
                      ? this.state.comments.author.username
                      : `No user found!`}
                  </p>
                </div>
                <hr className="hr_comment_top" />
                <p className="showing_comments_text">Comments</p>
                <form
                  onSubmit={this.postComments}
                  className="form_post_comment"
                >
                  <input
                    className="input_post_comment"
                    type="text"
                    name="commentText"
                    autoComplete="off"
                    id=""
                    value={this.state.commentText}
                    onChange={this.onChange}
                  />
                  <div className="user_avatar_comment_container">
                    <img
                      className="user_avatar_comment"
                      src={this.props.profile && this.props.profile.avatar}
                      alt=""
                    />
                  </div>
                  <p className="write_your_comment">
                    {localStorage.token
                      ? `Write your comment...`
                      : `Signin to comment...`}
                  </p>
                  <p className="user_name_comment">
                    {this.props.profile && this.props.profile.username}
                  </p>
                  <button className="publish_comment" type="submit">
                    <MdPublish />
                  </button>
                </form>
                <section className="user_comments_big_container">
                  {this.state.comments && this.state.comments.comments ? (
                    this.state.comments.comments.map(comment => (
                      <Comment
                        {...comment}
                        handleState={this.handleState}
                        authorId = {author}
                        profile={this.props.profile}
                      />
                    ))
                  ) : (
                    <Loader />
                  )}
                </section>
              </section>
            </div>
          </article>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

export default withRouter(Comments);
