import {lex, TokenType} from "./Lexer";

describe('lexer', function () {
    it('creates tokens for addition', () => {
        const input = "3 + 2";

        let results = lex(input);

        expect(results.length).toBe(3);
        expect(results[0].type).toBe(TokenType.NUMBER)
        expect(results[1].type).toBe(TokenType.ADD)
        expect(results[2].type).toBe(TokenType.NUMBER)
    })

    it('creates tokens for subtraction', () => {
        const input = "3 - 2";

        let results = lex(input);

        expect(results.length).toBe(3);
        expect(results[0].type).toBe(TokenType.NUMBER)
        expect(results[1].type).toBe(TokenType.MINUS)
        expect(results[2].type).toBe(TokenType.NUMBER)
    })

    it('creates tokens for expressions without spaces', () => {
        const input = "3+2";

        let results = lex(input);

        expect(results.length).toBe(3);
        expect(results[0].type).toBe(TokenType.NUMBER)
        expect(results[1].type).toBe(TokenType.ADD)
        expect(results[2].type).toBe(TokenType.NUMBER)
    })
})