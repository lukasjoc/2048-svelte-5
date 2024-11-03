<script lang="ts">
    import { Board, Game, isHandlerKey } from "@/helpers/game.svelte";
    import { wait } from "@/helpers/std";
    import Tile from "@/components/Tile.svelte";
    import chartIcon from "@/assets/icons/chart.svg?raw";

    const DEFAULT_SIZE = 4;

    type Size = {
        label: string;
        value: number;
    };

    const sizes = $state<Size[]>(
        [DEFAULT_SIZE, 3, 2].map((s) => ({ label: `${s}x${s}`, value: s })),
    );

    const board = new Board(DEFAULT_SIZE, DEFAULT_SIZE);
    const game = new Game(board);

    let size = $state<number>(DEFAULT_SIZE);

    function handleResize() {
        game.reset();
        board.resize(size, size);
    }
    function handleReset() {
        game.reset();
        board.reset();
    }

    async function onkeyup(event: KeyboardEvent) {
        if (game.lost) {
            game.saveTopScore();
            game.reset();
            board.reset();
            game.loadTopScore();
            return;
        }
        await wait(50);
        if (isHandlerKey(event.key)) {
            await game.move(event.key);
        }
    }
</script>

<svelte:window {onkeyup} />

<div class="gamewrapper" style:background-color={board.palette.bg}>
    <div class="gameinfo">
        <div class="controls">
            <select
                disabled={game.score > 0 && !game.lost}
                bind:value={size}
                onchange={handleResize}
            >
                {#each sizes as size}
                    <option value={size.value}>{size.label}</option>
                {/each}
            </select>
            <button onclick={handleReset}> Reset Game </button>
        </div>

        <div class="scores">
            <div
                title="Current Score"
                class="score"
                style:background-color={board.palette.bg}
            >
                {game.score}
            </div>
            {#if game.topScore}
                <div
                    style:background-color={board.palette.bg}
                    title={`Top Score (${new Date(game.topScore.ts).toLocaleString()})`}
                    class="score topscore"
                >
                    {game.topScore.score}
                    {@html chartIcon}
                </div>
            {/if}
        </div>
    </div>

    <div class="board" style:background-color={board.palette.bg}>
        {#each board.tiles as row, rowIdx (rowIdx)}
            <div class="row">
                {#each row as tile, tileIdx (tileIdx)}
                    <Tile {tile} />
                {/each}
            </div>
        {/each}
    </div>

    {#if game.lost}
        <span class="lost">Game is lost!</span>
    {/if}
</div>

<style>
    .gamewrapper {
        display: flex;
        flex-direction: column;
        padding: 3px;
        gap: 3px;
        width: 480px;
        height: 520px;
    }
    .gameinfo {
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 3px;
        max-height: 50px;
    }
    .controls,
    .scores {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 3px;
        padding: 3px;
        filter: brightness(75%);
    }

    .score {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        height: 24px;
        min-width: 24px;
        font-size: 18px;
        gap: 3px;
    }

    .topscore {
        font-weight: 800;
        font-size: 16px;
    }

    .lost {
        color: white;
        font-size: 32px;
    }

    .board {
        width: fit-content;
        padding: 3px;
        filter: brightness(75%);
    }

    .row {
        display: flex;
        flex-direction: row;
    }
</style>
