import { choose } from "@/helpers/random";

export type HexValue = `#${string}`;

export type Palette = {
    fg: HexValue;
    bg: HexValue;
    tile: HexValue[];
}

/** https://github.com/altercation/solarized/blob/master/README.md */
export const solarized: Palette = {
    fg: "#002b36", // $base03
    bg: "#073642", // $base02
    tile: [
        "#fdf6e3", // $base3
        "#b58900", // $yellow
        "#cb4b16", // $orange
        "#dc322f", // $red
        "#d33682", // $magenta
        "#6c71c4", // $violet
        "#268bd2", // $blue
        "#2aa198", // $cyan
        "#859900", // $green

        "#839496", // $base0
        "#93a1a1", // $base1
        "#eee8d5", // $base2
    ],
};

/** AI generated */
export const monokai: Palette = {
    fg: "#f8f8f2", // Base foreground
    bg: "#272822", // Base background
    tile: [
        "#f92672", // Pink (red)
        "#fd971f", // Orange
        "#66d9ef", // Cyan
        "#ae81ff", // Violet
        "#a6e22e", // Green
        "#75715e", // Dark grey
        "#ffb86c", // Yellow
        "#ff79c6", // Magenta
        "#8be9fd", // Light cyan
        "#4d4d4d", // Medium grey
    ],
};

/** AI generated */
export const gruvbox: Palette = {
    fg: "#ebdbb2", // Base foreground
    bg: "#282828", // Base background
    tile: [
        "#fb4934", // Red
        "#fe8019", // Orange
        "#fabd2f", // Yellow
        "#b8bb26", // Green
        "#8ec07c", // Aqua
        "#83a598", // Blue
        "#d3869b", // Purple
        "#d65d0e", // Bright orange
        "#bdae93", // Light grey
        "#7c6f64", // Dark grey
    ],
};

/** AI generated */
export const cobalt: Palette = {
    fg: "#cce5ff", // Base foreground
    bg: "#002240", // Base background
    tile: [
        "#ff5c5c", // Red
        "#ffb86c", // Orange
        "#f1fa8c", // Yellow
        "#50fa7b", // Green
        "#6272a4", // Aqua
        "#bd93f9", // Purple
        "#8be9fd", // Light cyan
        "#ff79c6", // Pink
        "#f8f8f2", // Light grey
        "#4d4d4d", // Medium grey
    ],
};

/** AI generated */
export const dracula: Palette = {
    fg: "#f8f8f2", // Base foreground
    bg: "#282a36", // Base background
    tile: [
        "#ff5555", // Red
        "#ffb86c", // Orange
        "#f1fa8c", // Yellow
        "#50fa7b", // Green
        "#8be9fd", // Cyan
        "#6272a4", // Blue
        "#bd93f9", // Purple
        "#ff79c6", // Pink
        "#f8f8f2", // Light grey
        "#4d4d4d", // Dark grey
    ],
};

/** AI generated */
export const quietVim: Palette = {
    fg: "#eaeaea", // Light foreground
    bg: "#1c1c1c", // Dark background
    tile: [
        "#2e2e2e", // Dark gray
        "#3c3c3c", // Gray
        "#4a4a4a", // Mid-gray
        "#585858", // Medium dark gray
        "#666666", // Medium gray
        "#747474", // Light gray
        "#828282", // Light gray
        "#909090", // Very light gray
        "#a0a0a0", // Almost white
        "#b0b0b0", // Pale gray
    ],
};

/** AI generated */
export const purpleShades: Palette = {
    fg: "#947cb0", // Light foreground
    bg: "#1e1e2f", // Dark background
    tile: [
        "#6a0dad", // Dark purple
        "#8e44ad", // Purple
        "#9b59b6", // Light purple
        "#af7ac5", // Soft lavender
        "#d7bde2", // Light lavender
        "#4b0082", // Indigo
        "#c39bd3", // Light mauve
        "#dcdcdc", // Light grey
        "#ffffff", // White for highlights
        "#7d3c98", // Medium purple
    ],
};

export const getRandomPalette = () => choose(
    solarized,
    gruvbox,
    purpleShades,
    monokai,
    dracula,
    cobalt,
    quietVim,
);
