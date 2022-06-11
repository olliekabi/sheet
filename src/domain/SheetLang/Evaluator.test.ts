
import {evaluateSheet} from "./Evaluator";

describe('evaluator', function () {
    it('returns array of resulting values', () => {

        let inputs = ["1 + 1", "4 - 2", ""];
        let lookup = new Map<string, number>();
        let result = evaluateSheet(inputs, lookup);

        expect(result.length).toBe(3);
        expect(result[0]).toBe("2");
        expect(result[1]).toBe("2");
        expect(result[2]).toBe("");
    })

    it('returns NaN for invalid cells', () => {

        let inputs = ["1 + 1", "2 + 4", "2 +"];
        let lookup = new Map<string, number>();
        let result = evaluateSheet(inputs, lookup);

        expect(result.length).toBe(3);
        expect(result[0]).toBe("2");
        expect(result[1]).toBe("6");
        expect(result[2]).toBe("NaN");
    })

    it('retrieves referenced cell values', () => {

        let inputs = ["1 + 1", "a0 + 2"];
        let lookup = new Map<string, number>();
        lookup.set("a0", 0)
        lookup.set("a1", 1)
        let result = evaluateSheet(inputs, lookup);

        expect(result.length).toBe(2);
        expect(result[0]).toBe("2");
        expect(result[1]).toBe("4");
    })

    it('retrieves forward referenced cell values', () => {

        let inputs = ["a1 + 2", "2"];
        let lookup = new Map<string, number>();
        lookup.set("a0", 0)
        lookup.set("a1", 1)
        let result = evaluateSheet(inputs, lookup);

        expect(result.length).toBe(2);
        expect(result[0]).toBe("4");
        expect(result[1]).toBe("2");
    })
})