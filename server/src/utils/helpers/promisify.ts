function promisify (
    fn: Function,
    hasManyResults = false
): Function {
    return (...args: unknown[]): Promise<unknown> => {
        return new Promise((resolve, reject) => {
            const cb = (
                error: Error | null,
                ...results: unknown[]
            ): void => {
                if (error) {
                    reject(error);
                }

                resolve((hasManyResults) ? results : results[0]);
            };

            args.push(cb);
            fn(...args);
        });
    };
}

export default promisify;
