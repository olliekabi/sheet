import {Token, TokenType} from "./Lexer";
import {parse} from "./Parser";

describe('parser', function () {
    it('creates AST from addition tokens', () => {
        const tokens = []
        tokens[0] = {type: TokenType.NUMBER, value: "3"} as Token
        tokens[1] = {type: TokenType.ADD} as Token
        tokens[2] = {type: TokenType.NUMBER, value: "2"} as Token

        let result = parse(tokens);

        expect(result).toBe(5);
    })

    it('creates AST from subtraction tokens', () => {
        const tokens = []
        tokens[0] = {type: TokenType.NUMBER, value: "3"} as Token
        tokens[1] = {type: TokenType.MINUS} as Token
        tokens[2] = {type: TokenType.NUMBER, value: "2"} as Token

        let result = parse(tokens);

        expect(result).toBe(1);
    })

    it('creates AST from multiple operator tokens', () => {
        const tokens = []
        tokens[0] = {type: TokenType.NUMBER, value: "1"} as Token
        tokens[1] = {type: TokenType.ADD} as Token
        tokens[2] = {type: TokenType.NUMBER, value: "2"} as Token
        tokens[3] = {type: TokenType.ADD} as Token
        tokens[4] = {type: TokenType.NUMBER, value: "3"} as Token

        let result = parse(tokens);

        expect(result).toBe(6);
    })
});