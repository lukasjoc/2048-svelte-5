type TilePos = [/*rowIdx*/number, /*colIdx*/number];
export type TileType = {
    value: number;
    color: string;
    pos?: TilePos;
};

/** WIP */
function getColorForValue(value: number): string {
    if (value === 2) return "#fdf6e3"; // Base background color (light)
    if (value === 4) return "#b58900"; // Yellow (high contrast)
    if (value === 8) return "#cb4b16"; // Orange (high contrast)
    if (value === 16) return "#dc322f"; // Red (high contrast)
    if (value === 32) return "#d33682"; // Magenta (high contrast)
    if (value === 64) return "#6c71c4"; // Violet (high contrast)
    if (value === 128) return "#268bd2"; // Blue (high contrast)
    if (value === 256) return "#2aa198"; // Cyan (high contrast)
    if (value === 512) return "#859900"; // Green (high contrast)
    return "black";
}

export function createTile(value: number): TileType {
    return { value, color: getColorForValue(value) };
}
