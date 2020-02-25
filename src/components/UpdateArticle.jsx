import React from "react";
import { MdUpdate } from "react-icons/md";
import { withRouter } from "react-router-dom";

class UpdateArticle extends React.Component {
  constructor() {
    super();
    this.state = {
      image: null,
      title: null,
      description: null,
      body: null,
      tags: null
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    this.setState({
      image: this.props.article && this.props.article.image,
      title: this.props.article && this.props.article.title,
      description: this.props.article && this.props.article.description,
      body: this.props.article && this.props.article.body,
      tags: this.props.article && this.props.article.tagList
    });
  }

  handleUpdate = event => {
    event.preventDefault();
    fetch(`/api/v1/articles/${this.props.article && this.props.article.slug}`, {
      method: "PUT",
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
          this.props.isUpdated(true);
          this.props.history.push("/");
        }
      });
  };

  render() {
    return (
      <article className="new_post_container">
        {/* <div className="form_top_gradient"></div> */}
        {/* <div className="new_post_form_container">
          <div className="new_post_form_sub_container"> */}
        <form className="new_post_form" onSubmit={this.handleUpdate}>
          <div className="tags_img_conrainer">
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
              name="tags"
              placeholder="Enter tags"
              value={this.state.tags}
              onChange={this.handleChange}
            />
          </div>
          <input
            className="input_new_post article_title"
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
            rows="25"
            placeholder="Write your article"
            value={this.state.body}
            onChange={this.handleChange}
          >
            {this.state.body}
          </textarea>
          {/* <input
            className="input_new_post"
            type="text"
            name="tags"
            placeholder="Enter tags"
            value={this.state.tags}
            onChange={this.handleChange}
          /> */}
          <button className="new_post_btn" type="submit">
            <MdUpdate className="publish_icon" />
          </button>
          <p className="publish_btn">Update</p>
        </form>
        {/* </div>
        </div> */}
        {/* <div className="form_bottom_gradient"></div> */}
      </article>
    );
  }
}

export default withRouter(UpdateArticle);
