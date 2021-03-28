function isJSON (value: unknown): boolean {
    try {
        JSON.parse(value as string);
        return true;
    } catch (error) {
        return false;
    }
}

export default isJSON;
