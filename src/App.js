import React from "react";
import logo from "./logo.svg";
import "./App.css";
import RegexValidator from "./components/RegexValidator";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <RegexValidator />
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
    </div>
  );
}

export default App;
