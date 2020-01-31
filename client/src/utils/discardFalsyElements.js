function discardFalsyElements (array = []) {
    return array.filter(element => Boolean(element));
};

export default discardFalsyElements;
