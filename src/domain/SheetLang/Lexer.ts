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

export interface Token {
    type: TokenType,
    value: number
}

export function lex(value: string): Token[] {

    let tokenStrings = value.split(' ')
    let tokens = tokenStrings.map((token) => {
        switch (token) {
            case "+":
                return {type: TokenType.ADD} as Token
            case "-":
                return {type: TokenType.MINUS} as Token
            default:
                return {type: TokenType.NUMBER, value: parseInt(token)} as Token
        }
    });

    return tokens ? tokens : [];
}