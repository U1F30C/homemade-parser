import { LexerPattern } from "./types";

export interface Token {
  code: number;
  lexem: string;
  name: string;
}

function scan(input: string, patterns: LexerPattern[], delimiterCode = -1) {
  let tokens: Token[] = [];
  let i = 0;
  while (i < input.length) {
    let anyMatchOnIndex = false;
    for (const pattern of patterns) {
      const sliced = input.slice(i);
      let matched = pattern.pattern.exec(sliced);
      if (matched) {
        let match = matched[0];
        let code = pattern.code;
        let lexem = pattern.name;

        if (pattern.code != delimiterCode) {
          tokens.push({ code, lexem: match, name: lexem });
        }

        i += match.length;
        anyMatchOnIndex = true;
        break;
      }
    }
    if (!anyMatchOnIndex) {
      return { tokens: null };
    }
  }
  return { tokens: tokens.concat([{ code: 2, lexem: "$", name: "EOF" }]) };
}

export { scan };

// module.exports = { scan };
