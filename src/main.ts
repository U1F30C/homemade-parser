import { scan, Token } from "./parser/lexer";
import { parse } from "./parser/syntaxer";

function pad(string: string) {
  return string.toString().padEnd(25, " ");
}

function padAndFormat(token: Token) {
  return `${pad(token.name)}|${pad(token.lexem)}|${pad(token.code.toString())}`;
}

function main() {
  const input = `
    int main() {
      if(1 == 3)
        printf("Hello, World!");
      return 0;
    }
    `;

  const { tokens } = scan(input);
  let tokenString;
  if (!tokens) {
    tokenString = "Invalid symbol";
  } else {
    tokenString = tokens.map(padAndFormat).join("\n");
  }
  console.log(input);
  // console.log(tokens);
  console.log(tokenString);

  const syncacticAnalysisResult = parse(tokens);
  console.log(syncacticAnalysisResult);
}
main();
