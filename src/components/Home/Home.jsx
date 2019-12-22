//Absolute imports

import React from "react";
import { Route, Switch } from "react-router-dom";

// Relative imports

import Sidebar from "./Sidebar";
import Middle from "./Middle";
import Aside from "./Aside";
import Signup from "../Signup";
import Signin from "../Signin";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      tag: [],
      articles: [],
      profiles: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/tags")
      .then(tag => tag.json())
      .then(tag => this.setState({ tag }));
    fetch("http://localhost:3000/api/v1/articles")
      .then(articles => articles.json())
      .then(articles => this.setState({ articles }));
    fetch("http://localhost:3000/api/v1/profiles")
      .then(profiles => profiles.json())
      .then(profiles => this.setState({ profiles }));
  }

  render() {
    console.log(this.state.tag.tags);
    return (
      <section className="home">
        <Sidebar />
        <div className="home_main_container">
          <>
            <Switch>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/signin">
                <Signin />
              </Route>
              <Route path="/">
                <Middle articles={this.state.articles.articles} />
                <Aside tag={this.state.tag.tags} />
              </Route>
            </Switch>
          </>
        </div>
      </section>
    );
  }
}

export default Home;
