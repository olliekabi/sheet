import {lex, Token, TokenType} from "./Lexer";
import {parse} from "./Parser";

export function evaluateSheet(inputs: string[], cellLookup: Map<string, number>): string[] {
    let outputs: string[] = [];

    inputs.forEach((input, index) => {
        outputs[index] = evaluate(index, inputs, outputs, cellLookup);
    })

    return outputs;
}

function evaluate(index: number, inputs: string[], outputs: string[], cellLookup: Map<string, number>): string {
    if (!inputs[index])
        return "";

    if (outputs[index])
        return outputs[index]

    let input = inputs[index];

    let result;
    try {
        let tokens = lex(input);

        let calculatedTokens = tokens.map((token) => {
            if (token.type === TokenType.CELL) {
                let referencedCellIndex = cellLookup.get(token.value)!;
                if (outputs[referencedCellIndex]) {
                    console.log("found")
                    return new Token(TokenType.NUMBER, outputs[referencedCellIndex])
                } else {
                    console.log("calculating")
                    result = evaluate(referencedCellIndex, inputs, outputs, cellLookup);
                    console.log("result: ", result);
                    outputs[referencedCellIndex] = result;
                    return new Token(TokenType.NUMBER, result)
                }
            }

            return token;
        })

        console.log(calculatedTokens);
        let output = parse(calculatedTokens);
        result = output.toString();
    } catch (e) {
        console.error(e);
        result = "NaN"
    }

    return result;
}



