import chalk from "chalk";
import { chain, last } from "lodash";
import {
  acceptedAt,
  Action,
  getRuleAtIndex,
  transitionAt,
} from "./data/syntax";
import { terminalDescription } from "./data/terminal-description";
import { Token } from "./lexer";
import { StackItem } from "./syntaxer";

function colourAction(action: Action) {
  if (!action) return "Error";
  if (action.type == "shift") {
    return `${chalk.yellow(action.type)} ${action.code}`;
  } else {
    const rule = getRuleAtIndex(action.code);
    return `${chalk.blue(action.type)} ${rule.name} ${rule.code} (pop ${
      rule.tokenCount * 2
    })`;
  }
}
function coulourStackElement(item: StackItem) {
  // return item.type + "-" + item.data;
  if (item.type == "state") {
    return chalk.gray(item.data.toString());
  }
  if (item.type == "token") {
    return chalk.white(item.data.toString());
  }
  if (item.type == "expression") {
    return chalk.magenta(item.data.toString());
  }
}

export function printDebugInfo(stack: StackItem[], token: Token, at?: number) {
  let currentState = <number>last(stack).data;
  let action = transitionAt(currentState, at ?? token.code);
  const expected = chain(currentState)
    .thru(acceptedAt)
    .map((action, i) => (action ? i : null))
    .without(null)

    .map((id) => `${id}${terminalDescription[id] ?? ""} `)

    .join(",")
    .value();
  console.log(">> " + stack.map(coulourStackElement).join(" "));

  console.log(
    `                        found:'${token.lexem}' ${colourAction(action)}`
  );
  // console.log(
  //   `          [state ${currentState}] expected [${expected}] found:[${
  //     token.code
  //   } '${token.lexem}'] | ${colourAction(action)}`
  // );
}
