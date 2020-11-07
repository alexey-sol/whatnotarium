interface Item {
    createdAt: Date;
    digest: string;
    hash: Buffer;
    id: number;
    iterations: number;
    keyLength: number;
    salt: string;
    updatedAt: Date;
    userId: number;
}

export default Item;
