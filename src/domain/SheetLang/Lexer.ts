export enum TokenType {
    NUMBER = 0,
    ADD,
    MINUS,
    MULTIPLY,
    DIVISION,

    LPAREN,
    RPAREN,

    EOF
}

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export class Token {
    type: TokenType;
    value: number;

    constructor(type: TokenType, value?: number) {
        this.type = type;
        this.value = value || 0;
    }
}

export function lex(input: string): Token[] {
    if (!input)
        return [];

    let tokens: Token[] = [];
    let index = 0;

    while (index < input.length)
    {
        let currentInput = input[index]

        if (currentInput === ' ' || currentInput === '\t') {
            index++;
        } else if (numbers.includes(currentInput)) {
            let [token, newIndex] = getNumber(input, index);
            index = newIndex;
            tokens.push(token);
        } else if (currentInput === '+') {
            let token = new Token(TokenType.ADD);
            tokens.push(token);
            index++;
        } else if (currentInput === '-') {
            let token = new Token(TokenType.MINUS);
            tokens.push(token);
            index++;
        }
    }

    return tokens;
}

function getNumber(input: string, index: number): [Token, number] {

    let numberString = "";

    while (numbers.includes(input[index])) {
        numberString += input[index];
        index++;
    }

    let token = new Token(TokenType.NUMBER, parseInt(numberString))

    return [token, index];
}