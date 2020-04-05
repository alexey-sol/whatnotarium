interface HashPasswordOptions {
    digest: string;
    iterations: number;
    keyLength: number;
    salt: string;
}

export default HashPasswordOptions;
