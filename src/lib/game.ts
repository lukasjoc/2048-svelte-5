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
    let combined = row.slice();
    for (let i = combined.length - 1; i >= 0; i--) {
        let rhs = i;
        let lhs = i - 1;
        if (lhs === -1) break;
        // if rhs === 0 and lhs is non zero combine to lhs if moving right
        console.log(lhs, rhs, "<|>", combined[lhs], combined[rhs])
        if (combined[rhs] === 0 && combined[lhs] === 0) continue;
        let valuesMatch = combined[rhs] === combined[lhs];
        let canShiftToRight = combined[rhs] === 0;
        if (valuesMatch || canShiftToRight) {
            console.log("\t transform:combine", rhs, lhs)
            let res = combined[rhs] + combined[lhs];
            combined.splice(lhs, 2); // remove the pair (only one combination in move)
            combined.push(res); // push the result
            combined.unshift(0); // pad the left side as we move to the right
        }
        console.log("Transform : ", combined);
    }
    return combined;
}

function transformRight1(row: number[]): number[] {
    let shifted = toRightShifted(row);
    let combined = toRightCombined(shifted);
    return combined;
}

if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest
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
    ];

    it('can move right', () => {
        for (const [input, expected] of cases) {
            expect(transformRight1(input)).toStrictEqual(expected)
        }
    })
}
