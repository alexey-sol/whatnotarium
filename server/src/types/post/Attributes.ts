import Author from "#types/Author";

interface Attributes {
    author?: Author;
    body?: string;
    createdAt?: Date;
    id?: number;
    title?: string;
    updatedAt?: Date;
    userId?: number;
}

export default Attributes;
