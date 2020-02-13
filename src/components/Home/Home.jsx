//Absolute imports

import React from "react";
import { Route, Switch } from "react-router-dom";

// Relative imports

import Sidebar from "./Sidebar";
import Middle from "./Middle";
import Aside from "./Aside";
import Signup from "../Signup";
import Signin from "../Signin";
import Profile from "../Profile/profile";
import UsersProfile from "../Profile/UsersProfile";
import FollowingUserProfile from "../Profile/FollowingUserProfile";
import NewPost from "../NewPost";
import Article from "./Article";
import Comments from "./Comments";
import Settings from "../Profile/Settings";
import UserContext from "../Context/UserContext";
import UpdateArticle from "../UpdateArticle";
import Footer from "../Footer";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      tag: [],
      articles: [],
      article: null,
      profile: [],
      menu: "",
      articlesbytags: [],
      activeTag: "",
      isLogged: false,
      isUpdated: false,

      //global feeds
      globalfeeds: true,

      // my feeds
      feeds: false
    };
  }

  componentDidMount() {
    fetch("/api/v1/tags")
      .then(tag => tag.json())
      .then(tag => this.setState({ tag }));
    fetch("/api/v1/articles")
      .then(articles => articles.json())
      .then(articles => this.setState({ articles }));

    fetch("/api/v1/users", {
      headers: {
        "Content-type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(profile => profile.json())
      .then(profile => {
        if (localStorage.token) {
          this.isLogged(true);
        }
        this.setState({ profile });
      })

      .catch(err => console.error(err));
  }

  isLogged = value => {
    this.setState({ isLogged: value });
  };

  singleArticle = Article => {
    this.setState({ article: Article });
  };

  isUpdated = value => {
    this.setState({ isUpdated: value }, () => this.handleUpdated());
  };
  handleUpdated = () => {
    if (this.state.isUpdated) {
      fetch("/api/v1/articles")
        .then(articles => articles.json())
        .then(articles => this.setState({ articles }));
      fetch("/api/v1/tags")
        .then(tag => tag.json())
        .then(tag => this.setState({ tag }));
      fetch("/api/v1/users", {
        headers: {
          "Content-type": "application/json",
          authorization: localStorage.token
        }
      })
        .then(profile => profile.json())
        .then(profile => this.setState({ profile }));
    }
  };

  handleMenu = menu => {
    this.setState({ menu: menu });
  };

  articlesByTags = tag => {
    let filtered = this.state.articles.articles.filter(article => {
      return article.tagList && article.tagList.includes(tag);
    });
    this.setState({
      articlesbytags: filtered,
      activeTag: tag,
      globalfeeds: false,
      feeds: false
    });
  };

  globalfeeds = feed => {
    this.setState({ articlesbytags: [], feeds: feed, globalfeeds: true });
  };
  myfeeds = feed => {
    this.setState({
      feeds: feed,
      articlesbytags: [],
      globalfeeds: false
    });
  };

  render() {
    return (
      <UserContext.Provider value={this.state.isLogged}>
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
                  <Signin isLogged={this.isLogged} isUpdated={this.isUpdated} />
                </Route>
                <Route path="/newpost">
                  <NewPost isUpdated={this.isUpdated} />
                </Route>
                <Route path="/profile">
                  <Profile
                    profile={this.state.profile}
                    articles={this.state.articles.articles}
                    isUpdated={this.isUpdated}
                  />
                </Route>
                <Route path="/usersprofile/:username">
                  <FollowingUserProfile
                    profile={this.state.profile}
                    isUpdated={this.isUpdated}
                    articles={this.state.articles.articles}
                  />
                </Route>
                <Route path="/usersprofile">
                  <UsersProfile
                    profile={this.state.profile}
                    article={this.state.article}
                    isUpdated={this.isUpdated}
                    articles={this.state.articles.articles}
                  />
                </Route>

                <Route path="/updatearticle">
                  <UpdateArticle
                    article={this.state.article}
                    isUpdated={this.isUpdated}
                  />
                </Route>

                <Route path="/articles/:slug/comments">
                  <Comments profile={this.state.profile} />
                </Route>
                <Route path="/articles/:slug">
                  <Article
                    article={this.state.article}
                    singleArticle={this.singleArticle}
                    profile={this.state.profile}
                    isUpdated={this.isUpdated}
                  />
                </Route>

                <Route path="/settings">
                  <Settings
                    isLogged={this.isLogged}
                    isUpdated={this.isUpdated}
                  />
                </Route>

                <Route path="/">
                  <>
                    <Middle
                      feeds={this.state.feeds}
                      myfeeds={this.myfeeds}
                      articles={
                        this.state.articlesbytags.length
                          ? this.state.articlesbytags
                          : this.state.articles.articles
                      }
                      globalfeeds={this.globalfeeds}
                      globalfeedsActive={this.state.globalfeeds}
                      tagName={this.state.activeTag}
                      articlesByTags={this.state.articlesbytags}
                    />
                    <Aside
                      tag={this.state.tag.tags}
                      profile={this.state.profile}
                      logged={this.state.isLogged}
                      articlesByTags={this.articlesByTags}
                    />
                  </>
                </Route>
              </Switch>
            </>
          </div>
          <Footer />
        </section>
      </UserContext.Provider>
    );
  }
}

export default Home;
