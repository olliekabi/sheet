import {lex} from "./Lexer";
import {parse} from "./Parser";

export function evaluateSheet(cellValues: string[]): string[] {
    return cellValues.map(evaluate);
}

function evaluate(input: string): string {
    if (!input)
        return input;

    let result;
    try {
        let tokens = lex(input);
        let output = parse(tokens);
        result = output.toString();
    } catch {
        result = "NaN"
    }

    return result;
}



