//Absolute import
import React from "react";
import { BrowserRouter } from "react-router-dom";

//Relative import
import Main from "./components/Main";
import "./stylesheets/style.scss";

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
