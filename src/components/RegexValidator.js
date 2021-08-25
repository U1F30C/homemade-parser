import React, { Component } from "react";
import ParametersForm from "./RegexForm";

class PerceptronVisualizer extends Component {

  render() {
    return (
      <div>
        <div>Lexer</div>
        <div>
            <ParametersForm />
        </div>
      </div>
    );
  }
}

export default PerceptronVisualizer;
