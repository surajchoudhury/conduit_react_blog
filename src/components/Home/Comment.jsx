import React from "react";
import { FaTrash } from "react-icons/fa";
import { withRouter } from "react-router-dom";

class Comment extends React.Component {
  deleteComments = () => {
    fetch(
      `http://localhost:3000/api/v1/${this.props.match.url}/${this.props._id}`,
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
          fetch(
            `http://localhost:3000/api/v1/articles/${this.props.match.params.slug}`
          )
            .then(res => res.json())
            .then(comments => this.props.handleState(comments));
        }
      });
  };

  render() {
    let currentUser = this.props.profile && this.props.profile._id;
    let commentor = this.props.author._id;
    let author = this.props.authorId;

    return (
      <div className="user_comments_container">
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
              <p className="date_comment">{new Date().toDateString()}</p>
            </div>

            { currentUser === commentor  || currentUser === author ?
              <p className="trash" onClick={this.deleteComments}>
                <FaTrash />
              </p>
          :"" }
          </div>
        </div>
        <p className="comment_text">{this.props.body}</p>
      </div>
    );
  }
}

export default withRouter(Comment);
