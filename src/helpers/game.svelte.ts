import { onMount } from 'svelte';
import { choose, rand } from "@/helpers/random";
import { combineToRight, combineToLeft } from "@/helpers/combine";
import { deepEquals } from "@/helpers/std";
import { getRandomPalette, type Palette } from "@/helpers/palette";
import { type TileCssOutput, type TileType, createTile, generateTileCss } from "@/helpers/tile";
import { wait } from "@/helpers/std";

export class Board {
    palette: Palette;
    tileCssOutput: TileCssOutput;

    tiles = $state<TileType[][]>([]);

    getSlice() { return this.tiles.slice() }

    private create() {
        for (let rowIdx = 0; rowIdx < this.rows; rowIdx++) {
            let row = [];
            for (let colIdx = 0; colIdx < this.cols; colIdx++) {
                const tile = createTile(0, this.tileCssOutput);
                row.push(tile);
            }
            this.tiles.push(row);
        }
        // TODO: seed rnadom amount of starting slots
        // TODO: clean this up
        const first = choose(2, 4);
        const second = first === 2 ? 4 : 2;
        const rowIdxFirst = rand(this.rows);
        const colIdxFirst = rand(this.cols);
        this.tiles[rowIdxFirst][colIdxFirst] = createTile(first, this.tileCssOutput);
        let rowIdxSecond = rand(this.rows);
        let colIdxSecond = rand(this.cols);
        while (rowIdxSecond === rowIdxFirst) {
            rowIdxSecond = rand(this.cols);
        }
        while (colIdxSecond === colIdxFirst) {
            colIdxSecond = rand(this.rows);
        }
        this.tiles[rowIdxSecond][colIdxSecond] = createTile(second, this.tileCssOutput);
    }

    constructor(public rows: number, public cols: number) {
        const palette = getRandomPalette();
        const tileCssOutput = generateTileCss(palette, 11);
        this.palette = palette;
        this.tileCssOutput = tileCssOutput;
        this.create();
    }

    reset() {
        this.tiles = [];
        this.create();
    }

    resize(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.reset();
    }

    private findEmptySlots() {
        let slots: [number, number][] = [];
        for (let rowIdx = 0; rowIdx < this.rows; rowIdx++) {
            for (let colIdx = 0; colIdx < this.cols; colIdx++) {
                if (this.tiles[rowIdx][colIdx].value !== 0) continue;
                slots.push([rowIdx, colIdx]);
            }
        }
        return slots;
    }

    async chooseNext(waitMs: number = 200) {
        let slots = this.findEmptySlots();
        if (slots.length === 0) {
            return;
        }
        const [rowIdx, colIdx] = choose(...slots);
        const val = choose(2, 4);
        await wait(waitMs);
        this.tiles[rowIdx][colIdx] = createTile(val, this.tileCssOutput);
    }
}

type Move = {
    score: number;
    moved: boolean;
};

function createMove(): Move {
    return { score: 0, moved: false }
}

function setDidMove(move: Move, a: number[], b: number[]): boolean {
    if (move.moved) return move.moved;
    move.moved = deepEquals(a, b) === false;
    return move.moved;
}

type TopScoreState = {
    score: number;
    ts: number;
}

export class Game {
    // TODO: score current game state in local storage
    // TODO: score should be per size
    static STORAGE_KEY_TOPSCORE = "2048.topscore";
    static STORAGE_KEY_GAME = "2048.game"

    score = $state(0);
    topScore = $state<TopScoreState | null>(null);

    loadTopScore() {
        const item = window.localStorage.getItem(Game.STORAGE_KEY_TOPSCORE);
        if (item === null) return;
        const topScore = JSON.parse(item) as TopScoreState;
        this.topScore = topScore;
    }

    saveTopScore() {
        const score = this.score;
        if (this.topScore && score < this.topScore.score) return;
        const serial = JSON.stringify({ score, ts: Date.now() });
        window.localStorage.setItem(Game.STORAGE_KEY_TOPSCORE, serial);
    }

    lost = $state(false)

    constructor(private board: Board) {
        onMount(() => {
            this.loadTopScore();
        })
    }

    reset() {
        this.score = 0;
        this.lost = false;
    }

    private moveRight() {
        const move = createMove();
        for (let rowIdx = 0; rowIdx < this.board.rows; rowIdx++) {
            let row = this.board.tiles[rowIdx].map((_) => _.value);
            let { result, score } = combineToRight(row);
            setDidMove(move, result, row);
            this.board.tiles[rowIdx] = result
                .map((v) => createTile(v, this.board.tileCssOutput));
            move.score += score;
        }
        return move;
    }

    private moveLeft() {
        const move = createMove();
        for (let rowIdx = 0; rowIdx < this.board.rows; rowIdx++) {
            let row = this.board.tiles[rowIdx].map((_) => _.value);
            let { result, score } = combineToLeft(row);
            setDidMove(move, result, row);
            this.board.tiles[rowIdx] = result
                .map((v) => createTile(v, this.board.tileCssOutput));
            move.score += score;
        }
        return move;
    }

    private moveDown() {
        const move = createMove();
        for (let rowIdx = 0; rowIdx < this.board.rows; rowIdx++) {
            let transposed: number[] = [];
            for (let colIdx = 0; colIdx < this.board.cols; colIdx++) {
                transposed.push(this.board.tiles[colIdx][rowIdx].value);
            }

            let { result, score } = combineToRight(transposed);
            setDidMove(move, result, transposed);
            let resultTiles = result
                .map((v) => createTile(v, this.board.tileCssOutput))
            for (let colIdx = 0; colIdx < this.board.cols; colIdx++) {
                this.board.tiles[colIdx][rowIdx] = resultTiles[colIdx];
            }
            move.score += score;
        }
        return move;
    }

    private moveUp() {
        const move = createMove();
        for (let rowIdx = 0; rowIdx < this.board.rows; rowIdx++) {
            let transposed: number[] = [];
            for (let colIdx = 0; colIdx < this.board.cols; colIdx++) {
                transposed.push(this.board.tiles[colIdx][rowIdx].value);
            }
            let { result, score } = combineToLeft(transposed);
            setDidMove(move, result, transposed);
            let resultTiles = result
                .map((v) => createTile(v, this.board.tileCssOutput));
            for (let colIdx = 0; colIdx < this.board.cols; colIdx++) {
                this.board.tiles[colIdx][rowIdx] = resultTiles[colIdx];
            }
            move.score += score;
        }
        return move;
    }

    private checkGameCondition(): boolean {
        const slice = this.board.getSlice();
        let lost = true;
        for (let rowIdx = 0; rowIdx < this.board.rows; rowIdx++) {
            const row = slice[rowIdx];
            const rowValues = row.map((_) => _.value);
            let movableRight = deepEquals((combineToRight(rowValues)).result, rowValues) === false;
            let movableLeft = deepEquals((combineToLeft(rowValues)).result, rowValues) === false;
            if (movableRight || movableLeft) {
                lost = false;
                break;
            }
            let colValues: number[] = [];
            for (let colIdx = 0; colIdx < this.board.cols; colIdx++) {
                colValues.push(slice[colIdx][rowIdx].value);
            }
            let movableUp = deepEquals((combineToLeft(colValues)).result, colValues) === false;
            let movableDown = deepEquals((combineToRight(colValues)).result, colValues) === false;
            if (movableUp || movableDown) {
                lost = false;
                break;
            }
        }
        return lost;
    }

    async move(key: HandlerKey) {
        if (this.lost) {
            return;
        }
        let move: Move;
        if (key === "ArrowRight") move = this.moveRight();
        else if (key === "ArrowLeft") move = this.moveLeft();
        else if (key === "ArrowUp") move = this.moveUp();
        else if (key === "ArrowDown") move = this.moveDown();
        else throw new Error(`Move not supported with key: '${key}'`);
        // console.log("[MOVE %s]: ", key, move);
        this.score += move.score;
        const lost = this.checkGameCondition();
        if (lost) {
            this.lost = lost;
            this.saveTopScore();
            return;
        }
        if (move.moved) {
            await this.board.chooseNext();
        }
    }
}

const handlerKeys = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"] as const;

export type HandlerKey = typeof handlerKeys[number];

export function isHandlerKey(key: HandlerKey | string): key is HandlerKey {
    return handlerKeys.includes(key as HandlerKey)
}

