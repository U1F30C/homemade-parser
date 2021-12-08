import React, { Component } from "react";
import { scan } from "./../parser/lexer";
import { parse } from "../parser/syntaxer";

class ParametersForm extends Component {
  state = {
    input: `
int main() {
  if(1 == 3)
    printf("Hello, World!");
  return 0;
}
  `,
    tokens: [],
    tokenString: [],
    syncacticAnalysisResult: "",
  };
  handleChange = this.handleChange.bind(this);
  pad(string) {
    return string.toString().padEnd(20, " ");
  }
  padAndFormat(token) {
    return `${this.pad(token.name)}|${this.pad(token.lexem)}|${this.pad(
      token.code
    )}`;
  }

  handleChange(event) {
    const input = event.target.value;
    const { tokens } = scan(input);
    let tokenString;
    if (!tokens) {
      tokenString = "Invalid symbol";
    } else {
      tokenString = tokens.map(this.padAndFormat.bind(this)).join("\n");
    }
    const syncacticAnalysisResult = parse(tokens);
    this.setState({ tokens, input, tokenString, syncacticAnalysisResult });
  }
  //[event.target.name]: event.target.value

  render() {
    return (
      <form>
        <label>
          Entrada:
          <textarea
            name="input"
            value={this.state.input}
            onChange={this.handleChange}
            style={{ width: "400px", height: "200px" }}
          />
        </label>
        <br />
        <label>
          Tokens:
          <textarea
            name="tokens"
            value={this.state.tokenString}
            style={{ width: "400px", height: "50px" }}
          />
        </label>
        <label>
          Análisis sintáctico:
          <textarea
            name="syntax"
            value={this.state.syncacticAnalysisResult?"Válido":"Inválido"}
            style={{ width: "400px", height: "50px" }}
          />
        </label>
        <br />
        <br />
      </form>
    );
  }
}

export default ParametersForm;
