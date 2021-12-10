import chalk from "chalk";
import { chain, last } from "lodash";
import { terminalDescription } from "./data/terminal-description";
import { Token } from "./lexer";
import { StackItem, SyntaxDescription } from "./syntaxer";
import { Action } from "./types";

function colourAction(action: Action, syntaxDescription: SyntaxDescription) {
  if (!action) return "Error";
  if (action.type == "shift") {
    return `${chalk.yellow(action.type)} ${action.code}`;
  } else {
    const rule = syntaxDescription.getRuleAtIndex(action.code);
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

export function printDebugInfo(
  stack: StackItem[],
  token: Token,
  syntaxDescription: SyntaxDescription,
  at?: number
) {
  let currentState = <number>last(stack).data;
  let action = syntaxDescription.transitionAt(currentState, at ?? token.code);
  const expected = chain(currentState)
    .thru(syntaxDescription.acceptedAt)
    .map((action, i) => (action ? i : null))
    .without(null)

    .map((id) => `${id}${terminalDescription[id] ?? ""} `)

    .join(",")
    .value();
  console.log(">> " + stack.map(coulourStackElement).join(" "));

  console.log(
    `                        found:'${token.lexem}' ${colourAction(
      action,
      syntaxDescription
    )}`
  );
  // console.log(
  //   `          [state ${currentState}] expected [${expected}] found:[${
  //     token.code
  //   } '${token.lexem}'] | ${colourAction(action)}`
  // );
}
