import React from "react";
import { FaTrash } from "react-icons/fa";
import { withRouter } from "react-router-dom";

class Comment extends React.Component {
  state = { isLoading: false };
  deleteComments = () => {
    this.setState({ isLoading: true });
    fetch(
      `/api/v1/articles/${this.props.match.params.slug}/comments/${this.props._id}`,
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
          fetch(`/api/v1/articles/${this.props.match.params.slug}`)
            .then(res => res.json())
            .then(comments => {
              this.props.handleState(comments);
              this.setState({ isLoading: false });
            });
        }
      });
  };

  render() {
    let currentUser = this.props.profile && this.props.profile._id;
    let commentor = this.props.author._id;
    let author = this.props.authorId;

    return (
      <>
        <div
          className={
            this.state.isLoading
              ? "user_comments_container_loading"
              : "user_comments_container"
          }
        >
          <div className="user_image_container_comment">
            <div className="user_img_container_comment">
              <img
                className="user_avatar_comment"
                src={this.props.author.avatar}
                alt=""
              />
            </div>
            <div className="username_container_comment_big">
              <div className="username_container_comment">
                <p className="username_comment">{this.props.author.username}</p>
                <p className="date_comment">
                  {new Date(this.props.createdAt).toDateString()}
                </p>
              </div>
              {currentUser === commentor || currentUser === author ? (
                <p className="trash" onClick={this.deleteComments}>
                  <FaTrash />
                </p>
              ) : null}
            </div>
          </div>
          <p className={this.state.isLoading ? "comment_text_center" : "comment_text"}>
            {this.state.isLoading ? (
              <p className="loader4 loader_small"></p>
            ) : (
              this.props.body
            )}
          </p>
        </div>
      </>
    );
  }
}

export default withRouter(Comment);
