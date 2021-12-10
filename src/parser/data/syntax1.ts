import { Action, LexerPattern, ReductionRule } from "../types";

export const patterns: LexerPattern[] = [
  { name: "whitespace", pattern: /^\s+/, code: -1 },
  {
    name: "identifier",
    pattern: /^[_A-Za-z][_A-Za-z0-9]*/,
    code: 0,
  },
  { name: "arithmetic sum operator", pattern: /^\+|\-/, code: 1 },
  { name: "end of file", pattern: /^$/, code: 2 },
];

// 52 rules
const baseRules: [number, number, string][] = [
  [2, 1, "programa"],
  [3, 3, "Suma"],
];
const rules: ReductionRule[] = baseRules.map(([code, tokenCount, name]) => ({
  code,
  tokenCount,
  name,
}));

// 95 states, 46 codes
const rawParsingTable = `2	0	0	1
0	0	-1	0
0	3	0	0
4	0	0	0
0	0	-3	0`;

const parsingTable: Action[][] = rawParsingTable.split("\n").map((line) =>
  line
    .split("\t")
    .map((number) => parseInt(number, 10))
    .map((transitionCode) => {
      if (transitionCode == 0) return null;
      if (transitionCode == -1) return { type: "finish", code: transitionCode };
      if (transitionCode < 0)
        return { type: "reduce", code: Math.abs(transitionCode) };
      if (transitionCode > 0)
        return { type: "shift", code: Math.abs(transitionCode) };
    })
);
// console.log(parsingTable);

function getRuleAtIndex(index: number) {
  return rules[index - 2];
}

function transitionAt(stateIndex: number, symbolCode: number | string): Action {
  return parsingTable[stateIndex][symbolCode];
}

function acceptedAt(stateIndex: number): Action[] {
  return parsingTable[stateIndex];
}

export { parsingTable, rules, getRuleAtIndex, transitionAt, acceptedAt };
