<script module lang="ts">
export type TilePos = [/*rowIdx*/number, /*colIdx*/number];
export type TileType = {
    value: number;
    color: string;
    pos?: TilePos;
};

/** WIP */
function getColorForValue(value: number): string {
    if (value === 2) return "white";
    if (value === 4) return "yellow";
    if (value === 8) return "orange";
    if (value === 16) return "orangered";
    if (value === 32) return "red";
    if (value === 64) return "purple";
    if (value === 128) return "blue";
    if (value === 256) return "darkblue";
    if (value === 512) return "darkgreen";
    return "black";
}

export function createTile(value: number): TileType {
    return { value, color: getColorForValue(value) };
}
</script>

<script lang="ts">
    const { tile }: {tile: TileType} = $props();
</script>

<div
    class="tile"
    style={tile.value ? `color:black;background-color:${tile.color};` : ""}
>
    <span class="value">{tile.value}</span>
</div>

<style>
    :root {
        --cell-width: 96px;
        --cell-height: 96px;
    }

    .tile {
        min-width: var(--cell-width);
        min-height: var(--cell-height);
        margin: 3px;
        border-radius: 3px;
        padding: 3px;
        color: white;
        background-color: #6e1b1b;
    }

    .value {
        font-family: Agave;
        font-size: 64px;
    }
</style>
