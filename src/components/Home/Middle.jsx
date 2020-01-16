import React from "react";
import { NavLink } from "react-router-dom";

// Relative imports

import Articles from "./Articles";
import { FaHashtag } from "react-icons/fa";

class Middle extends React.Component {
  constructor() {
    super();
    this.state = {
      myfeeds: null
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/articles/feed", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token
      }
    })
      .then(articles => articles.json())
      .then(articles => {
        this.setState({ myfeeds: articles });
      });
  }

  render() {
    let success =
      this.state.myfeeds && this.state.myfeeds.success ? true : false;
    return (
      <section className="middle">
        <div className="middle_sub_container">
          <div className="feeds_container">
            <NavLink
              to="/"
              activeClassName={
                this.props.globalfeedsActive ? `global_feed` : ""
              }
              className="global_feed_disable"
            >
              <p onClick={() => this.props.globalfeeds(false)}>Global Feed</p>
            </NavLink>
            <NavLink
              to="/"
              activeClassName={this.props.feeds ? `global_feed` : ""}
              className="global_feed_disable"
            >
              {localStorage.token ? (
                <p onClick={() => this.props.myfeeds(success)}>
                  {this.state.myfeeds && this.state.myfeeds.success
                    ? `My Feed`
                    : `No feeds`}
                </p>
              ) : (
                ""
              )}
            </NavLink>
            <p
              className={
                this.props.articlesByTags.length ? `global_feed` : `tag_disable`
              }
            >
              <span className="hash_tag">
                <FaHashtag />
              </span>
              {this.props.tagName}
            </p>
          </div>

          <article className="articles_container">
            {this.props.feeds &&
            this.state.myfeeds &&
            this.state.myfeeds.success
              ? this.state.myfeeds.articleFeeds.map(article => (
                  <Articles {...article} />
                ))
              : this.props.articles &&
                this.props.articles.map(article => <Articles {...article} />)}
          </article>
        </div>
      </section>
    );
  }
}

export default Middle;
