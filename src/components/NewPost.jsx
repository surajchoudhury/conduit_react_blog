import React from "react";
import { MdPublish } from "react-icons/md";
import { withRouter } from "react-router-dom";

class NewPost extends React.Component {
  constructor() {
    super();
    this.state = {
      image: null,
      title: null,
      description: null,
      body: null,
      tags: []
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlePublish = event => {
    event.preventDefault();
    fetch("http://localhost:3000/api/v1/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token
      },
      body: JSON.stringify({
        image: this.state.image,
        title: this.state.title,
        description: this.state.description,
        body: this.state.body,
        tagList: this.state.tags
      })
    })
      .then(article => article.json())
      .then(article => {
        if (article.success) {
          this.props.history.push("/");
        }
      });
  };

  render() {
    return (
      <article className="new_post_container">
        <div className="form_top_gradient"></div>
        <div className="new_post_form_container">
          <div className="new_post_form_sub_container">
            <form className="new_post_form" onSubmit={this.handlePublish}>
              <input
                className="input_new_post"
                type="text"
                placeholder="image link for the article"
                name="image"
                value={this.state.image}
                onChange={this.handleChange}
              />
              <input
                className="input_new_post"
                type="text"
                placeholder="Article Title"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
              <input
                className="input_new_post"
                type="text"
                placeholder="What's this article about"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
              <textarea
                className="input_new_post"
                name="body"
                id=""
                cols="30"
                rows="10"
                placeholder="Write your article"
                onChange={this.handleChange}
              >
                {this.state.body}
              </textarea>
              <input
                className="input_new_post"
                type="text"
                name="tags"
                placeholder="Enter tags"
                value={this.state.tags}
                onChange={this.handleChange}
              />
              <button className="new_post_btn" type="submit">
                <MdPublish />
              </button>
            </form>
          </div>
        </div>
        <div className="form_bottom_gradient"></div>
      </article>
    );
  }
}

export default withRouter(NewPost);
