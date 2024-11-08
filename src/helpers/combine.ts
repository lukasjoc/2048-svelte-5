import { deepEquals } from "@/helpers/std";

type CombinationResult = {
    result: number[];
    score: number;
}

export function combineToRight(xs: number[], __combined = false): CombinationResult {
    const result = xs.slice();
    let score = 0;
    for (let i = result.length - 1; i >= 0; i--) {
        const rhsIdx = i;
        const lhsIdx = i - 1;
        const rhs = result[rhsIdx];
        const lhs = result[lhsIdx];
        if (lhs === undefined) break;
        if (rhs !== 0 && lhs !== 0 && rhs !== lhs) continue;
        const sum = lhs + rhs;
        result.splice(lhsIdx, 2, sum);
        result.unshift(0);
        if (rhs > 0 && lhs > 0 && rhs === lhs) {
            score += sum;
            __combined = true;
        }
    }
    if (result[result.length - 1] === 0) __combined = false;
    if (__combined || deepEquals(xs, result)) {
        return { result, score };
    }
    return combineToRight(result, __combined);
}

export function combineToLeft(xs: number[], __combined = false): CombinationResult {
    const result = xs.slice();
    let score = 0;
    for (let i = 0; i < result.length; i++) {
        const lhsIdx = i;
        const rhsIdx = i + 1;
        const rhs = result[rhsIdx];
        const lhs = result[lhsIdx];
        if (rhs === undefined) break;
        if (rhs !== 0 && lhs !== 0 && rhs !== lhs) continue;
        const sum = lhs + rhs;
        result.splice(lhsIdx, 2, sum);
        result.push(0);
        if (rhs > 0 && lhs > 0 && rhs === lhs) {
            score += sum;
            __combined = true;
        }
    }
    if (result[0] === 0) __combined = false;
    if (__combined || deepEquals(xs, result)) {
        return { result, score };
    }
    return combineToLeft(result, __combined);
}

if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest;
    // TODO: test scores
    it("can shift right", () => {
        const cases = [
            [/* input*/[4, 0, 4], /* expected*/[0, 0, 8]],
            [/* input*/[4, 0, 0], /* expected*/[0, 0, 4]],
            [/* input*/[4, 4, 4], /* expected*/[0, 4, 8]],
            [/* input*/[0, 2, 0], /* expected*/[0, 0, 2]],
            [/* input*/[2, 4, 0], /* expected*/[0, 2, 4]],
            [/* input*/[0, 0, 2], /* expected*/[0, 0, 2]],
            [/* input*/[2, 0, 0], /* expected*/[0, 0, 2]],
            [/* input*/[2, 2, 2], /* expected*/[0, 2, 4]],
            [/* input*/[4, 4, 0], /* expected*/[0, 0, 8]],
            [/* input*/[0, 4, 4], /* expected*/[0, 0, 8]],
            [/* input*/[8, 4, 2], /* expected*/[8, 4, 2]],
            [/* input*/[8, 8, 8], /* expected*/[0, 8, 16]],
            [/* input*/[4, 4, 4], /* expected*/[0, 4, 8]],
            [/* input*/[4, 2, 0], /* expected*/[0, 4, 2]],
            [/* input*/[0, 2, 4], /* expected*/[0, 2, 4]],
            [/* input*/[8, 4, 4], /* expected*/[0, 8, 8]],
            [/* input*/[4, 4, 8], /* expected*/[0, 8, 8]],
            [/* input*/[4, 4, 0, 0], /* expected*/[0, 0, 0, 8]],
            [/* input*/[4, 4, 8, 0], /* expected*/[0, 0, 8, 8]],
        ];
        for (const [input, expected] of cases) {
            expect(combineToRight(input).result).toStrictEqual(expected);
        }
    });

    it("can shift left", () => {
        const cases = [
            [/* input*/[4, 0, 4], /* expected*/[8, 0, 0]],
            [/* input*/[4, 4, 4], /* expected*/[8, 4, 0]],
            [/* input*/[0, 2, 0], /* expected*/[2, 0, 0]],
            [/* input*/[2, 4, 0], /* expected*/[2, 4, 0]],
            [/* input*/[0, 0, 2], /* expected*/[2, 0, 0]],
            [/* input*/[2, 0, 0], /* expected*/[2, 0, 0]],
            [/* input*/[2, 2, 2], /* expected*/[4, 2, 0]],
            [/* input*/[4, 4, 0], /* expected*/[8, 0, 0]],
            [/* input*/[0, 4, 4], /* expected*/[8, 0, 0]],
            [/* input*/[8, 4, 2], /* expected*/[8, 4, 2]],
            [/* input*/[8, 8, 8], /* expected*/[16, 8, 0]],
            [/* input*/[4, 2, 0], /* expected*/[4, 2, 0]],
            [/* input*/[0, 2, 4], /* expected*/[2, 4, 0]],
            [/* input*/[8, 4, 4], /* expected*/[8, 8, 0]],
            [/* input*/[4, 4, 8], /* expected*/[8, 8, 0]],
            [/* input*/[0, 0, 4, 4], /* expected*/[8, 0, 0, 0]],
            [/* input*/[8, 4, 4, 0], /* expected*/[8, 8, 0, 0]],
        ];
        for (const [input, expected] of cases) {
            expect(combineToLeft(input).result).toStrictEqual(expected);
        }
    });
}
