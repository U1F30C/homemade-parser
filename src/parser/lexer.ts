const identifierCode = 0;

const patterns = [
  { name: "whitespace", pattern: /^\s+/, code: "_" },
  {
    name: "identifier",
    pattern: /^[_A-Za-z][_A-Za-z0-9]*/,
    code: identifierCode,
  },
  {
    name: "integer",
    pattern: /^-?\d+/,
    code: 1,
  },
  {
    name: "float",
    pattern: /^(?:(?:-?\d+(\.\d+(e\d+)?)?))/,
    code: 2,
  },
  {
    name: "string",
    pattern: /^".*"/,
    code: 3,
  },
  { name: "arithmetic sum operator", pattern: /^\+|\-/, code: 5 },
  { name: "arithmetic multiplication operator", pattern: /^\/|\*/, code: 6 },
  { name: "relational operator", pattern: /^[<>]=?/, code: 7 },
  { name: "or operator", pattern: /^&&/, code: 8 },
  { name: "and operator", pattern: /^\|\|/, code: 9 },
  { name: "equality operator", pattern: /^[!=]=/, code: 11 },
  { name: "and operator", pattern: /^!/, code: 10 },
  { name: "semicolon", pattern: /^;/, code: 12 },
  { name: "coma", pattern: /^,/, code: 13 },
  { name: "left parenthesis", pattern: /^\(/, code: 14 },
  { name: "right parenthesis", pattern: /^\)/, code: 15 },
  { name: "left bracket", pattern: /^\{/, code: 16 },
  { name: "right bracket", pattern: /^\}/, code: 17 },
  { name: "assign", pattern: /^=/, code: 18 },
  { name: "end of file", pattern: /^$/, code: 23 },
];
const types = { int: true, float: true, char: true, void: true };
const reserved = {
  if: { name: "if", code: 19 },
  while: { name: "while", code: 20 },
  return: { name: "return", code: 11 },
  else: { name: "else", code: 22 },
};

function scan(input) {
  let tokens = [];
  let i = 0;
  while (i < input.length) {
    let anyMatchOnIndex = false;
    for (const pattern of patterns) {
      const sliced = input.slice(i);
      let matched = pattern.pattern.exec(sliced);
      if (matched) {
        let match = matched[0];
        let code = "";
        let lexem = "";
        // if (pattern.code == identifierCode) {
        //   console.log(pattern, match, types[match], reserved[match]);
        // }

        if (pattern.code == identifierCode && types[match]) {
          code = 4;
          lexem = "type";
        } else if (pattern.code == identifierCode && reserved[match]) {
          code = reserved[match].code;
          lexem = reserved[match].name;
        } else {
          code = pattern.code;
          lexem = pattern.name;
        }
        if (pattern.code != "_") {
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
  return { tokens: tokens };
}

export { scan };

// module.exports = { scan };
