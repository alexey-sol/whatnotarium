interface Item {
    createdAt: Date;
    id: number;
    name: string;
    picture: Buffer;
    updatedAt: Date;
    userId: number;
}

export default Item;
