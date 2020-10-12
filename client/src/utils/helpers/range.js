function range (from, to, step = 1) {
    const result = [];
    let count = from;

    while (count <= to) {
        result.push(count);
        count += step;
    }

    return result;
}

export default range;
