import { getRuleAtIndex, transitionAt } from "./data/syntax";
import { last } from "lodash";
import { Token } from "./lexer";

interface StackItem {
  type: string;
  data: number | string;
}

export function parse(tokens: Token[]) {
  const stack: StackItem[] = [{ type: "state", data: 0 }];
  let tokenIndex = 0;
  let token: Token = undefined;

  while ((token = tokens[tokenIndex])) {
    const tokenId = token.code;
    let currentState = <number>last(stack).data;
    let action = transitionAt(currentState, tokenId);
    console.log(stack.map((element) => element.type + "-" + element.data));
    console.log(
      currentState,
      token.name + "-" + token.code,
      action?.type + "-" + action?.code
    );
    if (action == null) {
      return null;
    } else if (action.type == "shift") {
      const newState = action.code;
      stack.push({ type: "token", data: token.name });
      stack.push({ type: "state", data: newState });
      tokenIndex++;
    } else if (action.type == "reduce") {
      const reducedRule = getRuleAtIndex(action.code);
      const popCount = reducedRule.tokenCount * 2;
      currentState = <number>last(stack).data;
      action = transitionAt(currentState, reducedRule.code);
      if (action == null) return null;
      console.log(currentState, reducedRule.code);
      const newState = action.code;
      stack.splice(stack.length - popCount, popCount);
      stack.push({ type: "expression", data: reducedRule.name });
      stack.push({ type: "state", data: newState });
    } else {
      console.log(stack, action, token);
      throw new Error("Invalid action");
    }
  }
  return true;
}
