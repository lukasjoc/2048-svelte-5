type CombinationResult = {
    result: number[];
    score: number;
}
// TODO: move __rounds into the function and use while instead to keep going
// for cases that are shifted first but need further combination (can be combined).
export function combineToRight(xs: number[], __rounds = false): CombinationResult {
    let ret = xs.slice();
    let score = 0;
    for (let i = ret.length - 1; i >= 0; i--) {
        let rhsIdx = i;
        let lhsIdx = i - 1;
        let rhs = ret[rhsIdx];
        let lhs = ret[lhsIdx];
        if (lhs === undefined) break;
        if (rhs !== 0 && lhs !== 0 && rhs !== lhs) continue;
        let sum = lhs + rhs;
        ret.splice(lhsIdx, 2, sum);
        ret.unshift(0);
        if (rhs > 0 && lhs > 0 && rhs === lhs) {
            score += sum;
            __rounds = true
        }
    }
    if (__rounds || JSON.stringify(xs) === JSON.stringify(ret)) {
        return { result: ret, score };
    }
    // NOTE : in some cases we only shift in the first iteration so we need to
    // run it again to make our single combination happen. Thus the recursion.
    // Could be better implemented using a while(..) {..} i think. (FIXME)
    return combineToRight(ret, __rounds);
}

export function combineToLeft(xs: number[], __rounds = false): CombinationResult {
    let ret = xs.slice();
    let score = 0;
    for (let i = 0; i < ret.length; i++) {
        let lhsIdx = i;
        let rhsIdx = i + 1;
        let rhs = ret[rhsIdx];
        let lhs = ret[lhsIdx];
        if (rhs === undefined) break;
        if (rhs !== 0 && lhs !== 0 && rhs !== lhs) continue;
        let sum = lhs + rhs;
        ret.splice(lhsIdx, 2, sum);
        ret.push(0);
        if (rhs > 0 && lhs > 0 && rhs === lhs) {
            score += sum;
            __rounds = true
        }
    }
    if (__rounds || JSON.stringify(xs) === JSON.stringify(ret)) {
        return { result: ret, score };
    }
    return combineToLeft(ret, __rounds);
}

if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest
    // TODO: test scores
    it('can shift right', () => {
        let cases = [
            [/*input*/[4, 0, 4], /*expected*/[0, 0, 8]],
            [/*input*/[4, 4, 4], /*expected*/[0, 4, 8]],
            [/*input*/[0, 2, 0], /*expected*/[0, 0, 2]],
            [/*input*/[2, 4, 0], /*expected*/[0, 2, 4]],
            [/*input*/[0, 0, 2], /*expected*/[0, 0, 2]],
            [/*input*/[2, 0, 0], /*expected*/[0, 0, 2]],
            [/*input*/[2, 2, 2], /*expected*/[0, 2, 4]],
            [/*input*/[4, 4, 0], /*expected*/[0, 0, 8]],
            [/*input*/[0, 4, 4], /*expected*/[0, 0, 8]],
            [/*input*/[8, 4, 2], /*expected*/[8, 4, 2]],
            [/*input*/[8, 8, 8], /*expected*/[0, 8, 16]],
            [/*input*/[4, 4, 4], /*expected*/[0, 4, 8]],
            [/*input*/[4, 2, 0], /*expected*/[0, 4, 2]],
            [/*input*/[0, 2, 4], /*expected*/[0, 2, 4]],
            [/*input*/[8, 4, 4], /*expected*/[0, 8, 8]],
            [/*input*/[4, 4, 8], /*expected*/[0, 8, 8]],
        ];
        for (const [input, expected] of cases) {
            expect(combineToRight(input).result).toStrictEqual(expected)
        }
    })

    it('can shift left', () => {
        let cases = [
            [/*input*/[4, 0, 4], /*expected*/[8, 0, 0]],
            [/*input*/[4, 4, 4], /*expected*/[8, 4, 0]],
            [/*input*/[0, 2, 0], /*expected*/[2, 0, 0]],
            [/*input*/[2, 4, 0], /*expected*/[2, 4, 0]],
            [/*input*/[0, 0, 2], /*expected*/[2, 0, 0]],
            [/*input*/[2, 0, 0], /*expected*/[2, 0, 0]],
            [/*input*/[2, 2, 2], /*expected*/[4, 2, 0]],
            [/*input*/[4, 4, 0], /*expected*/[8, 0, 0]],
            [/*input*/[0, 4, 4], /*expected*/[8, 0, 0]],
            [/*input*/[8, 4, 2], /*expected*/[8, 4, 2]],
            [/*input*/[8, 8, 8], /*expected*/[16, 8, 0]],
            [/*input*/[4, 2, 0], /*expected*/[4, 2, 0]],
            [/*input*/[0, 2, 4], /*expected*/[2, 4, 0]],
            [/*input*/[8, 4, 4], /*expected*/[8, 8, 0]],
            [/*input*/[4, 4, 8], /*expected*/[8, 8, 0]],
        ];
        for (const [input, expected] of cases) {
            expect(combineToLeft(input).result).toStrictEqual(expected)
        }
    })
}
