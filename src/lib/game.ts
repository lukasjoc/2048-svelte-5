function toRightShifted(row: number[]): number[] {
    const zeros = [];
    for (let i = row.length - 1; i >= 0; i--) {
        if (row[i] !== 0) break;
        zeros.push(i);
    }
    if (zeros.length === 0) {
        return row.slice();
    }
    let cropped = row.slice();
    cropped.splice(zeros[zeros.length - 1], zeros.length);
    cropped.unshift(...zeros.map(_ => 0))
    return cropped;
}

function toRightCombined(row: number[]): number[] {
    let ret = row.slice();
    for (let i = ret.length - 1; i >= 0; i--) {
        let rhs = i;
        let lhs = i - 1;
        // if (lhs === -1) break;
        // if rhs === 0 and lhs is non zero combine to lhs if moving right
        // console.log(lhs, rhs, "<|>", ret[lhs], ret[rhs])
        if (ret[rhs] === 0 && ret[lhs] === 0) continue;
        if (ret[rhs] === ret[lhs]) {
            // console.log("\t transform:combine", rhs, lhs)
            let res = ret[rhs] + ret[lhs];
            ret.splice(lhs, 2); // remove the pair (only one combination in move)
            ret.push(res); // push the result
            ret.unshift(0); // pad the left side as we move to the right
        }
        // console.log("Transform : ", ret);
    }
    return ret;
}


function toLeftShifted(row: number[]): number[] {
    const zeros = [];
    for (let i = 0; i < row.length; i++) {
        if (row[i] !== 0) break;
        zeros.unshift(i);
    }
    if (zeros.length === 0) {
        return row.slice();
    }
    let cropped = row.slice();
    cropped.splice(zeros[zeros.length - 1], zeros.length);
    cropped.push(...zeros.map(_ => 0))
    return cropped;
}

function toLeftCombined(row: number[]): number[] {
    let ret = row.slice();
    for (let i = 0; i < ret.length; i++) {
        let rhs = i + 1;
        let lhs = i;
        if (rhs >= ret.length) break;
        // if rhs === 0 and lhs is non zero combine to lhs if moving right
        console.log(lhs, rhs, "<|>", ret[lhs], ret[rhs])
        if (ret[rhs] === 0 && ret[lhs] === 0) continue;
        if (ret[rhs] === ret[lhs]) {
            console.log("\t transform:combine", lhs, rhs)
            let res = ret[rhs] + ret[lhs];
            ret.splice(lhs, 2); // remove the pair (only one combination in move)
            ret.unshift(res); // push the result
            ret.push(0); // pad the left side as we move to the right
        }
        console.log("Transform : ", ret);
    }
    return ret;
}

export function toRightTransformed(row: number[]): number[] {
    let shifted = toRightShifted(row);
    let ret = toRightCombined(shifted);
    return ret;
}

export function toLeftTransformed(row: number[]): number[] {
    let shifted = toLeftShifted(row);
    console.log("shifted", shifted)
    let ret = toLeftCombined(shifted);
    return ret;
}
if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest
    it('can move right', () => {
        let cases = [
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
            [/*input*/[4, 0, 4], /*expected*/[0, 0, 8]], //NOK
        ];

        for (const [input, expected] of cases) {
            expect(toRightTransformed(input)).toStrictEqual(expected)
        }
    })

    // TODO:
    // need to start the shifting on the right most side where we want to move and
    // shift pairwise when possible instead of group wise
    it('can move left', () => {
        let cases = [
            [/*input*/[0, 2, 0], /*expected*/[2, 0, 0]],
            [/*input*/[2, 4, 0], /*expected*/[2, 4, 0]],
            [/*input*/[0, 0, 2], /*expected*/[2, 0, 0]],
            [/*input*/[2, 0, 0], /*expected*/[2, 0, 0]],
            [/*input*/[2, 2, 2], /*expected*/[4, 2, 0]],
            [/*input*/[4, 4, 0], /*expected*/[8, 0, 0]],
            [/*input*/[0, 4, 4], /*expected*/[8, 0, 0]],
            [/*input*/[8, 4, 2], /*expected*/[8, 4, 2]],
            [/*input*/[8, 8, 8], /*expected*/[16, 8, 0]],
            [/*input*/[4, 4, 4], /*expected*/[8, 4, 0]],
            // [/*input*/[4, 0, 4], /*expected*/[8, 0, 0]], //NOK
        ];
        for (const [input, expected] of cases) {
            expect(toLeftTransformed(input)).toStrictEqual(expected)
        }
    })
}
