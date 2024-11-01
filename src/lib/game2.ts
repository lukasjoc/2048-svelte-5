export function combineRowToRight(xs: number[]): number[] {
    let ret = xs.slice();
    // 2,2,2 => 0, 2, 4,
    // 0,4,0
    for (let i = ret.length - 1; i >= 0; i--) {
        let rhsIdx = i;
        let lhsIdx = i - 1;
        let rhs = ret[rhsIdx];
        let lhs = ret[lhsIdx];
        if (lhs === undefined) break;
        if (rhs === 0 || lhs === 0 || rhs === lhs) {
            // 2,2
            // 0,2
            // 2,0
            // combine
            let sum = lhs + rhs;
            // console.log(lhs, rhs, sum)
            ret.splice(lhsIdx, 2, sum);
            ret.unshift(0);
        } else {
            continue;
        }
    }
    if (JSON.stringify(xs) === JSON.stringify(ret)) {
        return ret;
    }
    return combineRowToRight(ret);
}

export function combineRowToLeft(xs: number[]): number[] {
    let ret = xs.slice();
    // 2,2,2 => 4,2,0
    // 0,4,04 = 4,0,0
    for (let i = 0; i < ret.length; i++) {
        let lhsIdx = i;
        let rhsIdx = i + 1;
        let rhs = ret[rhsIdx];
        let lhs = ret[lhsIdx];
        if (rhs === undefined) break;
        if (rhs === 0 || lhs === 0 || rhs === lhs) {
            // 2,2
            // 0,2
            // 2,0
            // combine
            let sum = lhs + rhs;
            // console.log(lhs, rhs, sum)
            ret.splice(lhsIdx, 2, sum);
            ret.push(0);
        } else {
            continue;
        }
    }
    if (JSON.stringify(xs) === JSON.stringify(ret)) {
        return ret;
    }
    return combineRowToLeft(ret);
}

// export function combine(xs: number[], dir: 'left' | 'right'): number[] {
//     let ret = xs.slice();
//     // 2,2,2 => 4,2,0
//     // 0,4,04 = 4,0,0
//     for (let i = 0; i < ret.length; i++) {
//         let lhsIdx = i;
//         let rhsIdx = i + 1;
//         let rhs = ret[rhsIdx];
//         let lhs = ret[lhsIdx];
//         if (rhs === undefined) break;
//         if (rhs === 0 || lhs === 0 || rhs === lhs) {
//             // 2,2
//             // 0,2
//             // 2,0
//             // combine
//             let sum = lhs + rhs;
//             // console.log(lhs, rhs, sum)
//             ret.splice(lhsIdx, 2, sum);
//             ret.push(0);
//         } else {
//             continue;
//         }
//     }
//     if (JSON.stringify(xs) === JSON.stringify(ret)) {
//         return ret;
//     }
//     return combineRowToLeft(ret);
// }

if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest
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
        ];
        for (const [input, expected] of cases) {
            expect(combineRowToRight(input)).toStrictEqual(expected)
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
        ];
        for (const [input, expected] of cases) {
            expect(combineRowToLeft(input)).toStrictEqual(expected)
        }
    })
}
