type TilePos = [/*rowIdx*/number, /*colIdx*/number];
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
