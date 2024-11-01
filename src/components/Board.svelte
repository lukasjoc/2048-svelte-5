<script lang="ts">
    import { combineToRight, combineToLeft } from "@/helpers/game";
    import { choose, rand } from "@/helpers/random";
    import Tile, { type TileType, createTile } from "@/components/Tile.svelte";

    const BOARD_WIDTH_DIM = 3;
    const BOARD_HEIGHT_DIM = 3;

    function createBoard() {
        const board: TileType[][] = [];
        for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
            let row = [];
            for (let cellIdx = 0; cellIdx < 3; cellIdx++) {
                const tile = createTile(0);
                // TODO: safe the row,col idx as this should simplify some code below
                row.push(tile);
            }
            board.push(row);
        }
        // TODO: clean this up
        const first = choose(2, 4);
        const second = first === 2 ? 4 : 2;
        const rowIdxFirst = rand(3);
        const colIdxFirst = rand(3);
        board[rowIdxFirst][colIdxFirst] = createTile(first);
        let rowIdxSecond = rand(3);
        let colIdxSecond = rand(3);
        while (rowIdxSecond === rowIdxFirst) {
            rowIdxSecond = rand(BOARD_HEIGHT_DIM);
        }
        while (colIdxSecond === colIdxFirst) {
            colIdxSecond = rand(BOARD_WIDTH_DIM);
        }
        board[rowIdxSecond][colIdxSecond] = createTile(second);
        return board;
    }
    const board = $state(createBoard());

    function findEmptyLocations() {
        let locations = [];
        for (let rowIdx = 0; rowIdx < BOARD_HEIGHT_DIM; rowIdx++) {
            for (let colIdx = 0; colIdx < BOARD_WIDTH_DIM; colIdx++) {
                if (board[rowIdx][colIdx].value !== 0) continue;
                locations.push([rowIdx, colIdx]);
            }
        }
        return locations;
    }

    function chooseNextRandomField() {
        let locations = findEmptyLocations();
        console.log(locations);
        if (locations.length === 0) return;
        const [rowIdx, colIdx] = choose(...locations);
        const val = choose(2, 4);

        setTimeout(() => {
            board[rowIdx][colIdx] = createTile(val);
        }, 200);
    }

    let topScore = $state(0);

    function onkeyup(event: KeyboardEvent) {
        switch (event.key) {
            case "ArrowRight":
                // TODO: backbuffer it ??
                for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
                    let row = board[rowIdx].map((_) => _.value);
                    let { result, score } = combineToRight(row);
                    board[rowIdx] = result.map(createTile);
                    topScore += score;
                }
                chooseNextRandomField();
                break;
            case "ArrowLeft":
                for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
                    let row = board[rowIdx].map((_) => _.value);
                    let { result, score } = combineToLeft(row);
                    board[rowIdx] = result.map(createTile);
                    score += score;
                }
                chooseNextRandomField();
                break;
            case "ArrowDown":
                for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
                    let transposed = [];
                    for (let colIdx = 0; colIdx < board.length; colIdx++) {
                        transposed.push(board[colIdx][rowIdx].value);
                    }
                    let { result, score } = combineToRight(transposed);
                    let resultTiles = result.map(createTile);
                    for (let colIdx = 0; colIdx < board.length; colIdx++) {
                        board[colIdx][rowIdx] = resultTiles[colIdx];
                    }
                    topScore += score;
                }
                chooseNextRandomField();
                break;
            case "ArrowUp":
                for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
                    let transposed = [];
                    for (let colIdx = 0; colIdx < board.length; colIdx++) {
                        transposed.push(board[colIdx][rowIdx].value);
                    }
                    let { result, score } = combineToLeft(transposed);
                    let resultTiles = result.map(createTile);
                    for (let colIdx = 0; colIdx < board.length; colIdx++) {
                        board[colIdx][rowIdx] = resultTiles[colIdx];
                    }
                    topScore += score;
                }
                chooseNextRandomField();
                break;
            default:
                /** NOOP */
                return;
        }
    }
    // TODO: mobile controls
</script>

<svelte:window {onkeyup} />
<div class="board">
    {#each board as row, rowIdx (rowIdx)}
        <div class="row">
            {#each row as tile, tileIdx (tileIdx)}
                <Tile {tile} />
            {/each}
        </div>
    {/each}
</div>
<div class="score">Score: {topScore}</div>

<style>
    .score {
        font-family: monospace;
        background-color: brown;
        width: fit-content;
        color: white;
        border-radius: 2px;
        padding: 3px;
        font-size: 18px;
        margin-top: 3px;
    }
    .board {
        width: fit-content;
        background-color: brown;
        border-radius: 3px;
        padding: 3px;
    }

    .row {
        display: flex;
        flex-direction: row;
    }
</style>
