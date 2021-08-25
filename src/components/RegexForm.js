import React, { Component } from "react";
import { scan } from "./../utils/lexer";

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
    result: "",
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
    let result;
    if (!tokens) {
      result = "Invalid symbol";
    } else {
      result = tokens.map(this.padAndFormat.bind(this)).join("\n");
    }

    this.setState({ result, input });
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
            style={{ width: "800px", height: "300px" }}
          />
        </label>
        <br />
        <label>
          Tokens:
          <textarea
            name="tokens"
            value={this.state.result}
            style={{ width: "1000px", height: "50px" }}
          />
        </label>
        <br />
        <br />
      </form>
    );
  }
}

export default ParametersForm;
