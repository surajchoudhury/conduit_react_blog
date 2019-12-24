//Absolute imports

import React from "react";
import { Route, Switch } from "react-router-dom";

// Relative imports

import Sidebar from "./Sidebar";
import Middle from "./Middle";
import Aside from "./Aside";
import Signup from "../Signup";
import Signin from "../Signin";
import Profile from "../profile";
import NewPost from "../NewPost";
import Article from "./Article";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      tag: [],
      articles: [],
      profile: [],
      menu: "",
      isLogged: false
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/tags")
      .then(tag => tag.json())
      .then(tag => this.setState({ tag }));
    fetch("http://localhost:3000/api/v1/articles")
      .then(articles => articles.json())
      .then(articles => this.setState({ articles }));
    fetch("http://localhost:3000/api/v1/users", {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(profile => profile.json())
      .then(profile => this.setState({ profile }));
    fetch("http://localhost:3000/api/v1/users", {
      headers: {
        Authorization: localStorage.token
      }
    });
    
  }

  isLogged = value => {
    this.setState({ isLogged: value });
  };

  handleMenu = menu => {
    this.setState({ menu: menu });
  };

  render() {
    console.log(this.state.article)
    return (
      <section className="home">
        <Sidebar
          menu={this.state.menu}
          handleMenu={this.handleMenu}
          logged={this.state.isLogged}
        />
        <div className="home_main_container">
          <>
            <Switch>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/signin">
                <Signin isLogged={this.isLogged} />
              </Route>
              <Route path="/newpost">
                <NewPost />
              </Route>
              <Route path="/profile">
                <Profile profile={this.state.profile} />
              </Route>
              <Route path="/articles/:slug">
                <Article />
              </Route>
              <Route path="/">
                <Middle articles={this.state.articles.articles} />
                <Aside
                  tag={this.state.tag.tags}
                  profile={this.state.profile}
                  logged={this.state.isLogged}
                />
              </Route>
            </Switch>
          </>
        </div>
      </section>
    );
  }
}

export default Home;
