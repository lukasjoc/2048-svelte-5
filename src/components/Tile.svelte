<script lang="ts">
    import { type TileType } from "./tile";
    const { tile }: { tile: TileType } = $props();
</script>

<div
    class="tile"
    style={tile.value ? `color:black;background-color:${tile.color};` : ""}
>
    <span class="value">{tile.value > 0 ? tile.value : ""}</span>
</div>

<style>
    :root {
        --tile-width: 96px;
        --tile-height: 96px;
    }

    .tile {
        width: var(--tile-width);
        height: var(--tile-height);
        margin: 3px;
        border-radius: 3px;
        padding: 3px;
        color: white;
        background-color: #6e1b1b;
    }

    .value {
        font-family: Agave, monospace;
        font-size: 64px;
    }
</style>
