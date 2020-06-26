import Author from "#types/Author";

interface Item {
    author: Author;
    body: string;
    createdAt: Date;
    id: number;
    title: string;
    updatedAt: Date;
    userId: number;
}

export default Item;
