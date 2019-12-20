//Absolute imports
import React from "react";

//Relative imports

import Home from "./Home/Home";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <main>
        <Home />
      </main>
    );
  }
}

export default Main;
