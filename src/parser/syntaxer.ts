import { getRuleAtIndex, transitionAt } from "./../data/syntax";
import { last } from "lodash";

export function parse(tokens) {
  const stack = [{ type: "state", data: 0 }];
  let tokenIndex = 0;
  let token = undefined;

  while ((token = tokens[tokenIndex])) {
    const tokenId = token.code;
    let currentState = last(stack).data;
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
      currentState = last(stack).data;
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
