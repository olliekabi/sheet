import {Token, TokenType} from "./Lexer";

export function parse(tokens: Token[]): number {
    return parseExpression(tokens).evaluate();
}

function parseExpression(tokens: Token[]): ASTNode {
    let first = new ASTLeaf(parseInt(tokens[0].value));

    if (tokens.length <= 1)
        return first;

    let index = 1;

    if (tokens[index].type === TokenType.ADD) {
        index++;
        let rightNode = term(tokens.slice(index));
        return new ASTPlus(first, rightNode);
    } else if (tokens[index].type === TokenType.MINUS) {
        index++;
        let rightNode = term(tokens.slice(index));
        return new ASTMinus(first, rightNode);
    }

    return first;
}

function term(tokens: Token[]): ASTNode {
    let index = 0;

    if (index + 1 === tokens.length && tokens[index].type === TokenType.NUMBER) {
        return new ASTLeaf(parseInt(tokens[index].value))
    } else {
        return parseExpression(tokens);
    }
}

interface ASTNode {
    evaluate: () => number
}

class ASTLeaf implements ASTNode {
    value: number

    constructor(value: number) {
        this.value = value;
    }

    evaluate = () => this.value;
}

class ASTPlus implements ASTNode {
    leftNode: ASTNode;
    rightNode: ASTNode;

    constructor(leftNode: ASTNode, rightNode: ASTNode) {
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }

    evaluate = () => {
        return this.leftNode.evaluate() + this.rightNode.evaluate()
    }
}

class ASTMinus implements ASTNode {
    leftNode: ASTNode;
    rightNode: ASTNode;

    constructor(leftNode: ASTNode, rightNode: ASTNode) {
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }

    evaluate = () => {
        return this.leftNode.evaluate() - this.rightNode.evaluate()
    }
}