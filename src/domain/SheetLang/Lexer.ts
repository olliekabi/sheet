export enum TokenType {
    UNKNOWN = 0,

    NUMBER,
    ADD,
    MINUS,
    MULTIPLY,
    DIVISION,

    LPAREN,
    RPAREN,

    CELL,

    EOF
}

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

export class Token {
    type: TokenType;
    value: string;

    constructor(type: TokenType, value?: string) {
        this.type = type;
        this.value = value || "";
    }
}

export function lex(input: string): Token[] {
    if (!input)
        return [];

    let cleanInput = input.toLowerCase();

    let tokens: Token[] = [];
    let index = 0;

    while (index < cleanInput.length)
    {
        let currentInput = cleanInput[index]

        if (currentInput === ' ' || currentInput === '\t') {
            index++;
        } else if (numbers.includes(currentInput)) {
            let [token, newIndex] = getNumber(cleanInput, index);
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
        } else if (alphabet.includes(currentInput)) {
            let [token, newIndex] = getCell(cleanInput, index);
            index = newIndex;
            tokens.push(token);
        } else {
            tokens.push(new Token(TokenType.UNKNOWN))
            break;
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

    let token = new Token(TokenType.NUMBER, numberString)

    return [token, index];
}

function getCell(input: string, index: number): [Token, number] {
    let cellString: string = input[index++];

    let [number, newIndex] = getNumber(input, index);
    cellString += number.value;

    let token = new Token(TokenType.CELL, cellString)

    return [token, newIndex];
}