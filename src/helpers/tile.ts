import { type Palette } from "./palette";

// TODO: pos for saving to localstorage
// type TilePos = [/*rowIdx*/number, /*colIdx*/number];
type TileCss = {
    color: string;
    backgroundColor: string;
    fontSize?: string;
}

export type TileValue = number;

export type TileType = {
    value: TileValue;
    css: TileCss;
    // pos?: TilePos;
}

export type TileCssOutput = Record<TileValue, TileCss>;
export function generateTileCss(palette: Palette, step: number): TileCssOutput {
    const origStep = step;
    const output: TileCssOutput = {
        0: { color: palette.bg, backgroundColor: palette.fg },
    };
    let value: TileValue = 1;
    while (step > 0) {
        const stepValue = value * 2;
        const idx = Math.abs(step - origStep);
        const paIdx = idx >= palette.tile.length ? palette.tile.length - 1 : idx;
        const stepValueLen = stepValue.toString().length;
        const css = {
            color: palette.bg,
            backgroundColor: palette.tile[paIdx],
            fontSize: { 1: "99px", 2: "89px", 3: "59px" }[stepValueLen] ?? "49px",
        } as TileCss;
        output[stepValue] = css;
        value = stepValue === 0 ? 2 : stepValue;
        step--;
    }
    return output;
}

export function createTile(value: TileValue, tileCssOutput: TileCssOutput): TileType {
    return { value, css: tileCssOutput[value] };
}
