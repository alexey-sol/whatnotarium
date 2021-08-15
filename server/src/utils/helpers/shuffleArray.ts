function shuffleArray (array: unknown[]): unknown[] {
    const clone = [...array];
    clone.sort(() => Math.random() - 0.5);
    return clone;
}

export default shuffleArray;
