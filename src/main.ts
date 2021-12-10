import {
  acceptedAt,
  getRuleAtIndex,
  patterns,
  transitionAt,
} from "./parser/data/syntax";
import { scan, Token } from "./parser/lexer";
import { parse } from "./parser/syntaxer";
import { printDebugInfo } from "./parser/syntaxer-debug";

function pad(string: string) {
  return string.toString().padEnd(25, " ");
}

function padAndFormat(token: Token) {
  return `${pad(token.name)}|${pad(token.lexem)}|${pad(token.code.toString())}`;
}

function main() {
  const input = `
  int a;
  int suma(int a, int b){
  return a+b;
  }
  
  int main(){
  float a;
  int b;
  int c;
  c = a+b;
  c = suma(8,9);
  }
    `;

  const { tokens } = scan(input, patterns);
  let tokenString: string;
  if (!tokens) {
    tokenString = "Invalid symbol";
  } else {
    tokenString = tokens.map(padAndFormat).join("\n");
  }
  console.log(input);
  // console.log(tokens);
  console.log(tokenString);

  const syncacticAnalysisResult = parse(
    tokens,
    { getRuleAtIndex, transitionAt, acceptedAt },
    printDebugInfo
  );
  console.log(syncacticAnalysisResult);
}
main();
