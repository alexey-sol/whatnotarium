function getRandomIntFromRange (range: [number, number]): number {
    const min = range[0];
    const max = range[1];
    return Math.trunc(Math.random() * (max - min) + min);
}

export default getRandomIntFromRange;
