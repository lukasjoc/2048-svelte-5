/** Chooses a random value from the items and returns it. */
export function choose<ValueType>(...items: ValueType[]) {
    const idx = Math.floor(Math.random() * items.length);
    return items[idx];
}

/** Generates a random number to the specified target. */
export function rand(target: number) {
    if (target <= 0) return 0;
    return Math.floor(Math.random() * target);
}

