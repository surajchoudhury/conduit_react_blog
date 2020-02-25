//Absolute import
import React from "react";
import { BrowserRouter } from "react-router-dom";

//Relative import
import Main from "./components/Main";
import "./stylesheets/style.scss";
import "./stylesheets/prism1.css";

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
