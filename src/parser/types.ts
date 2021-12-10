export interface Action {
  type: "reduce" | "shift" | "finish";
  code: number;
}

export interface ReductionRule {
  code: number;
  tokenCount: number;
  name: string;
}
export interface LexerPattern {
  name: string;
  pattern: RegExp;
  code: number;
}
