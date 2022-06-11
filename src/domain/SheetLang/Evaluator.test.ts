
import {evaluateSheet} from "./Evaluator";

describe('evaluator', function () {
    it('returns array of resulting values', () => {

        let result = evaluateSheet(["1 + 1", "2 + 4", ""]);

        expect(result.length).toBe(3);
        expect(result[0]).toBe("2");
        expect(result[1]).toBe("6");
        expect(result[2]).toBe("");
    })
})