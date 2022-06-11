import {lex} from "./Lexer";
import {parse} from "./Parser";

export function evaluateSheet(cellValues: string[]): string[] {
    return cellValues.map(evaluate);
}

function evaluate(input: string): string {
    if (!input)
        return input;

    let tokens = lex(input);
    let result = parse(tokens);

    return result.toString();
}



