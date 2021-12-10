import { last } from "lodash";
import { Token } from "./lexer";
import { Action, ReductionRule } from "./types";

interface DebugFunction {
  (
    stack: StackItem[],
    token: Token,
    syntaxDescription: SyntaxDescription,
    at?: number
  ): void;
}

export interface SyntaxDescription {
  acceptedAt: (stateIndex: number) => Action[];
  getRuleAtIndex: (stateIndex: number) => ReductionRule;
  transitionAt: (stateIndex: number, symbolCode: number | string) => Action;
}
export interface StackItem {
  type: "token" | "state" | "expression";
  data: number | string;
  children?: StackItem[];
}

export function parse(
  tokens: Token[],
  grammarSyntax: SyntaxDescription,
  debug: DebugFunction
) {
  const stack: StackItem[] = [{ type: "state", data: 0 }];
  let tokenIndex = 0;
  let token: Token = undefined;
  let tree: StackItem;
  while (true) {
    token = tokens[tokenIndex];
    const tokenId = token.code;
    let currentState = <number>last(stack).data;
    let action = grammarSyntax.transitionAt(currentState, tokenId);
    debug(stack, token, grammarSyntax);
    if (action == null) {
      return null;
    } else if (action.type == "shift") {
      const newState = action.code;
      stack.push({ type: "token", data: token.lexem });
      stack.push({ type: "state", data: newState });
      tokenIndex++;
    } else if (action.type == "reduce") {
      const reducedRule = grammarSyntax.getRuleAtIndex(action.code);
      const popCount = reducedRule.tokenCount * 2;
      const poppedElements = stack.splice(stack.length - popCount, popCount);
      currentState = <number>last(stack).data;
      action = grammarSyntax.transitionAt(currentState, reducedRule.code);
      debug(stack, token, grammarSyntax, reducedRule.code);
      if (action == null) return null;
      if (action.type == "finish") return {};

      const newState = action.code;
      //https://github.com/lmenezes/json-tree
      tree = {
        type: "expression",
        data: reducedRule.name,
        children: poppedElements,
      };
      stack.push({
        type: "expression",
        data: reducedRule.name,
      });
      stack.push({ type: "state", data: newState });
    } else {
      throw new Error("Invalid action");
    }
  }
  return tree;
}
