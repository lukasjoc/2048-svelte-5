<script lang="ts">
    import { combineToRight, combineToLeft } from "./game2";

    function choose(...items: number[]) {
        const idx = Math.floor(Math.random() * items.length);
        return items[idx];
    }

    function randN(N: number) {
        return Math.floor(Math.random() * N);
    }

    function getColorForValue(x: number): string {
        if (x === 2) return "white";
        if (x === 4) return "yellow";
        if (x === 8) return "orange";
        if (x === 16) return "orangered";
        if (x === 32) return "red";
        if (x === 64) return "purple";
        if (x === 128) return "blue";
        if (x === 256) return "darkblue";
        if (x === 512) return "darkgreen";
        return "black";
    }

    function seed() {
        console.log("Seed");
        const board: { value: number | null; color: string }[][] = [];
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            let row = [];
            for (let cellIndex = 0; cellIndex < 3; cellIndex++) {
                row.push({ value: null });
            }
            board.push(row);
        }
        const first = choose(2, 4);
        const second = first === 2 ? 4 : 2;

        const rowIdxFirst = randN(3);
        const colIdxFirst = randN(3);
        board[rowIdxFirst][colIdxFirst] = {
            value: first,
            color: getColorForValue(first),
        };
        let rowIdxSecond = randN(3);
        let colIdxSecond = randN(3);
        while (rowIdxSecond === rowIdxFirst) rowIdxSecond = randN(3);
        while (colIdxSecond === colIdxFirst) colIdxSecond = randN(3);
        board[rowIdxSecond][colIdxSecond] = {
            value: second,
            color: getColorForValue(second),
        };
        return board;
    }
    const seeded = seed();
    const board = $state(seeded);

    function chooseNextRandomField() {
        let indices = board
            .flat()
            .reduce(
                (x, curr, i) => (curr.value === null ? [...x, i] : x),
                [] as number[],
            );
        let idx = choose(...indices);
        let row = Math.floor(idx / board.length);
        let col = Math.max(row, row - 3);
        let x = choose(2, 4);
        board[row][col] = { value: x, color: getColorForValue(x) };
        console.log(idx);
    }

    function onkeyup(event: KeyboardEvent) {
        console.log(event);
        switch (event.key) {
            case "ArrowRight":
                for (let i = 0; i < board.length; i++) {
                    let row = board[i].map((x) => x.value ?? 0);
                    let transformed = combineToRight(row);
                    console.log("Index: ", i, row, transformed);
                    let ret = transformed.map((x) => ({
                        value: x == 0 ? null : x,
                        color: getColorForValue(x),
                    }));
                    board[i] = ret;
                }
                chooseNextRandomField();
                break;
            case "ArrowLeft":
                for (let i = 0; i < board.length; i++) {
                    let row = board[i].map((x) => x.value ?? 0);
                    let transformed = combineToLeft(row);
                    console.log("Index: ", i, row, transformed);
                    let ret = transformed.map((x) => ({
                        value: x == 0 ? null : x,
                        color: getColorForValue(x),
                    }));
                    board[i] = ret;
                }
                chooseNextRandomField();
                break;
            case "ArrowDown":
                break;
            case "ArrowUp":
                break;
            default:
                /** NOOP */
                return;
        }
    }
    $inspect(board);
</script>

<svelte:window {onkeyup} />

<div class="board">
    {#each board as row, i (i)}
        <div class="row">
            {#each row as cell, i (i)}
                <div
                    class="cell"
                    style={cell.value ? `background-color: ${cell.color};` : ""}
                >
                    <span class="index">{i}</span>
                    <span class="value">{cell.value}</span>
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    :root {
        --cell-width: 200px;
        --cell-height: 200px;
    }

    .board {
        /* display: flex; */
        width: fit-content;
        background-color: black;
        border-radius: 3px;
    }
    .row {
        display: flex;
        flex-direction: row;
    }

    .cell {
        width: var(--cell-width);
        height: var(--cell-height);
        margin: 3px;
        border-radius: 3px;
        /* display: flex; */
        /* color: red; */
    }
    .value {
        font-family: Agave;
        font-size: 64px;
    }
    .index {
        font-family: monospace;
        font-size: 8px;
    }
</style>
