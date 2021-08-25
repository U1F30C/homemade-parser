const patterns = [
  { name: "whitespace", pattern: /^\s+/, code: " " },
  { name: "identifier", pattern: /^[_A-Za-z][_A-Za-z0-9]*/, code: 1 },
  {
    name: "constant",
    pattern: /^(?:(?:-?\d+(\.\d+(e\d+)?)?))/,
    code: 13,
  },
];
const types = { int: true, float: true, char: true, void: true };
const reserved = {
  if: { name: "if", code: 9 },
  while: { name: "while", code: 10 },
  return: { name: "return", code: 11 },
  else: { name: "else", code: 12 },
};

export function scan(input) {
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
        if (pattern.code == 1 && types[match]) {
          code = 0;
          lexem = "type";
        } else if (pattern.code == 1 && reserved[match]) {
          code = reserved[match].code;
          lexem = reserved[match].name;
        } else {
          code = pattern.code;
          lexem = pattern.name;
        }
        if (pattern.code != " ") {
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
