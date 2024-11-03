<script lang="ts">
    import { type TileValue, type TileType } from "@/helpers/tile";
    const { tile }: { tile: TileType } = $props();

    const tileValue = $derived<TileValue | undefined>(
        tile.value > 0 ? tile.value : undefined,
    );
</script>

<div
    class="tile"
    style:color={tile.css.color}
    style:background-color={tile.css.backgroundColor}
    style:font-size={tile.css.fontSize}
>
    <span class="value">{tileValue}</span>
</div>

<style>
    :root {
        --tile-width: 96px;
        --tile-height: 96px;
    }

    .tile {
        width: var(--tile-width);
        height: var(--tile-height);
        margin: 2px;
        padding: 3px;
        text-align: center;
    }
</style>
