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

    function onkeyup(event: KeyboardEvent) {
        console.log(event);
        switch (event.key) {
            case "ArrowRight":
                break;
            case "ArrowLeft":
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
                    style={cell.value ? "background-color: white;" : ""}
                >
                    {cell.value}
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
        display: flex;
        width: fit-content;
        background-color: black;
    }

    .cell {
        width: var(--cell-width);
        height: var(--cell-height);
        margin: 3px;
        display: flex;
    }
</style>
