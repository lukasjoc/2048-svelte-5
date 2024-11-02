<script lang="ts">
    import { Board, Game, isHandlerKey } from "@/helpers/game.svelte";
    import { wait } from "@/helpers/std";
    import Tile from "@/components/Tile.svelte";
    import chartIcon from "@/assets/icons/chart.svg?raw";

    const DEFAULT_SIZE = 3;

    type Size = {
        label: string;
        value: number;
    };

    const sizes = $state<Size[]>(
        [DEFAULT_SIZE, 4].map((s) => ({ label: `${s}x${s}`, value: s })),
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
            return;
        }
        await wait(50);
        if (isHandlerKey(event.key)) {
            await game.move(event.key);
        }
    }
    // TODO: mobile controls
</script>

<svelte:window {onkeyup} />

<div class="gameinfo">
    {#if game.topScore}
        <div
            title={`Top Score (${new Date(game.topScore.ts).toLocaleString()})`}
            class="score topscore"
        >
            {@html chartIcon}
            {game.topScore.score}
        </div>
    {/if}
    <div title="Current Score" class="score currscore">{game.score}</div>
    {#if game.lost}
        <div class="lost">Nice try!</div>
    {/if}
</div>

<div class="board">
    {#each board.tiles as row, rowIdx (rowIdx)}
        <div class="row">
            {#each row as tile, tileIdx (tileIdx)}
                <Tile {tile} />
            {/each}
        </div>
    {/each}
</div>

<div class="gameconfig">
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

<div class="buttoncontrols">
    <div class="left">
        <button onclick={async () => await game.move("ArrowLeft")}>L</button>
    </div>
    <div class="middle">
        <button onclick={async () => await game.move("ArrowUp")}>U</button>
        <button onclick={async () => await game.move("ArrowDown")}>D</button>
    </div>
    <div class="right">
        <button onclick={async () => await game.move("ArrowRight")}>R</button>
    </div>
</div>

<style>
    .gameinfo {
        display: flex;
        margin-bottom: 3px;
    }

    .gameconfig {
        display: flex;
        margin-top: 3px;
        gap: 3px;
    }

    .score {
        font-family: Agave, Menlo, monospace;
        color: white;
        padding: 3px;
        font-size: 18px;
        margin-top: 3px;
        margin-right: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        max-height: 24px;
        min-height: 24px;
        min-width: 24px;
        background-color: black;
        font-weight: 800;
    }

    .topscore {
        font-weight: 800;
        font-size: 16px;
    }

    .lost {
        font-weight: 800;
        font-size: 32px;
        font-family: Agave, Menlo, monospace;
        color: brown;
    }

    .board {
        width: fit-content;
        background-color: black;
        padding: 3px;
        filter: brightness(75%);
    }

    .row {
        display: flex;
        flex-direction: row;
    }
    .buttoncontrols {
        display: flex;
        margin-top: 10px;
    }
    .buttoncontrols button {
        margin: 2px;
    }
    .buttoncontrols .left,
    .right {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    .buttoncontrols .middle {
        display: flex;
        flex-direction: column;
    }
</style>
