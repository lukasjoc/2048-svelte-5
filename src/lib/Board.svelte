<script lang="ts">
    import { toRightTransformed, toLeftTransformed } from "./game";

    function choose(...items: number[]) {
        const idx = Math.floor(Math.random() * items.length);
        return items[idx];
    }

    function randN(N: number) {
        return Math.floor(Math.random() * N);
    }
    function seed() {
        console.log("Seed");
        const board: { value: number | null }[][] = [];
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
        board[rowIdxFirst][colIdxFirst] = { value: first };
        let rowIdxSecond = randN(3);
        let colIdxSecond = randN(3);
        while (rowIdxSecond === rowIdxFirst) rowIdxSecond = randN(3);
        while (colIdxSecond === colIdxFirst) colIdxSecond = randN(3);
        board[rowIdxSecond][colIdxSecond] = { value: second };
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
        board[row][col] = { value: choose(2, 4) };
        console.log(idx);
    }

    function onkeyup(event: KeyboardEvent) {
        console.log(event);
        switch (event.key) {
            case "ArrowRight":
                for (let i = 0; i < board.length; i++) {
                    let row = board[i].map((x) => x.value ?? 0);
                    let transformed = toRightTransformed(row);
                    console.log("Index: ", i, row, transformed);
                    let ret = transformed.map((x) => ({
                        value: x == 0 ? null : x,
                    }));
                    board[i] = ret;
                }
                chooseNextRandomField();
                break;
            case "ArrowLeft":
                for (let i = 0; i < board.length; i++) {
                    let row = board[i].map((x) => x.value ?? 0);
                    let transformed = toLeftTransformed(row);
                    console.log("Index: ", i, row, transformed);
                    let ret = transformed.map((x) => ({
                        value: x == 0 ? null : x,
                    }));
                    board[i] = ret;
                }
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
    {#each board as row}
        <div class="row">
            {#each row as cell, i}
                <div
                    class="cell"
                    style={cell.value ? "background-color: white;" : ""}
                >
                    {i}{cell.value}
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    :root {
        --cell-width: 20px;
        --cell-height: 20px;
    }

    .board {
        /* display: flex; */
        width: fit-content;
        background-color: black;
    }
    .row {
        display: flex;
        flex-direction: row;
    }

    .cell {
        width: var(--cell-width);
        height: var(--cell-height);
        margin: 3px;
        /* display: flex; */
        color: red;
    }
</style>
