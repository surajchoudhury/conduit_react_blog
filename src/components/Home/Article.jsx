import React from "react";
import { withRouter } from "react-router-dom";

class Article extends React.Component {
  constructor() {
    super();
    this.state = {
      article: ""
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/${this.props.location.pathname}`)
      .then(article => article.json())
      .then(article => this.setState({ article }));
  }
  render() {
    return (
      <article className="single_article_container">
        <section className="single_article_wrapper">
          <p className="sigle_article_title">{this.state.article.title}</p>
          <p className="sigle_article_description">
            {this.state.article.description}
          </p>
          <div className="single_article_user_info_container">
            <div className="user_info_avatar_container">
              <img
                className="avatar"
                src={
                  this.state.article.author && this.state.article.author.avatar
                }
                alt=""
              />
            </div>

            <div className="single_article_info_container">
              <p className="single_article_username">
                {this.state.article.author &&
                  this.state.article.author.username}
              </p>
              <p className="single_article_date">{new Date().toDateString()}</p>
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
        </section>
      </article>
    );
  }
}

export default withRouter(Article);
