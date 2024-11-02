<script lang="ts">
    import { Board, Game, isHandlerKey } from "@/helpers/game.svelte";
    import { wait } from "@/helpers/std";
    import Tile from "@/components/Tile.svelte";
    import chartIcon from "@/assets/icons/chart.svg?raw";

    const board = new Board(3, 3);
    const game = new Game(board);

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

<style>
    .gameinfo {
        display: flex;
        margin-bottom: 3px;
    }

    .score {
        font-family: Agave;
        color: white;
        border-radius: 2px;
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
        background-color: brown;
        font-weight: 800;
    }

    .topscore {
        font-weight: 800;
        font-size: 16px;
    }

    .lost {
        font-weight: 800;
        font-size: 32px;
        font-family: Agave;
        color: brown;
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
