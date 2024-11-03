type Primitive = number;
type Comparable<T extends Primitive = Primitive> = T | T[];

/** Checks if a === b. Uses `JSON.stringify` for now to do the check. */
export function deepEquals<ArrayType extends Comparable>(a: ArrayType, b: ArrayType): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}

/** Waits a certain amount of ms. */
export const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
