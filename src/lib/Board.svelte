<script lang="ts">
    function choose(...items: number[]) {
        const idx = Math.floor(Math.random() * items.length);
        return items[idx];
    }

    function randN(N: number) {
        return Math.floor(Math.random() * N);
    }

    function seed() {
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

    function transformRight() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const val = board[i][j].value;
                if (val && j < 2) {
                    board[i][j + 1].value = val;
                    board[i][j].value = null;
                }
            }
        }
    }

    function transformLeft() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const val = board[i][j].value;
                if (val && j > 0) {
                    board[i][j - 1].value = val;
                    board[i][j].value = null;
                }
            }
        }
    }

    function onkeyup(event) {
        console.log(event);
        switch (event.key) {
            case "ArrowRight":
                transformRight();
                break;
            case "ArrowLeft":
                transformLeft();
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
</script>

<svelte:window {onkeyup} />

<div class="board">
    {#each board as row}
        <div class="row">
            {#each row as cell}
                <div
                    class="cell"
                    style={cell.value ? "background-color: #eee4da;" : ""}
                >
                    {cell.value}
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    :root {
        --cell-width: 80px;
        --cell-height: 80px;
    }

    .board {
        display: flex;
        width: fit-content;
        background-color: #bbada0;
        border-radius: 4px;
        border: 2px solid brown;
    }

    .cell {
        width: var(--cell-width);
        height: var(--cell-height);
        background-color: rgba(238, 228, 218, 0.35);
        border-radius: 1px;
        margin: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: sans-serif;
        font-size: 32px;
        font-weight: 600;
        color: brown;
    }
</style>
