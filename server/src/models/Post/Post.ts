import { UNPROCESSABLE_ENTITY } from "http-status";

import {
    countRecords,
    createRecord,
    destroyRecordById,
    findAllRecords,
    findOneRecord,
    findRecordById,
    updateRecordAttributes
} from "#utils/sql/Model";

import { CreatePostsTable } from "#utils/sql/SchemaSqlGenerator";
import { INVALID_PROPS } from "#utils/const/validationErrors";
import { POSTS } from "#utils/const/database/tableNames";
import Attributes from "#types/post/Attributes";
import DbQueryFilter from "#types/DbQueryFilter";
import Include from "#types/Include";
import Item from "#types/post/Item";
import Model from "#types/Model";
import PostError from "#utils/errors/PostError";
import UserProfile from "#types/UserProfile";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";
import isPostItem from "#utils/typeGuards/isPostItem";
import separateIncludedAttributes from "#utils/helpers/separateIncludedAttributes";

class Post implements Model<Attributes, Post> {
    static tableName = POSTS;

    author?: UserProfile;
    body: string;
    createdAt: Date;
    id: number;
    title: string;
    updatedAt: Date;
    userId: number;

    private constructor (props: Item) {
        this.body = props.body;
        this.createdAt = props.createdAt;
        this.id = props.id;
        this.title = props.title;
        this.updatedAt = props.updatedAt;
        this.userId = props.userId;

        if (props.author) {
            this.author = props.author;
        }
    }

    static async up (): Promise<void> {
        await generateSqlAndQuery(new CreatePostsTable());
    }

    static async create (
        props: Attributes
    ): Promise<Post> | never {
        const record = await createRecord<Attributes, Item>(POSTS, props);
        return Post.formatPropsAndInstantiate(record);
    }

    static async destroyById (
        id: number
    ): Promise<number | null> | never {
        return destroyRecordById<Item>(POSTS, id);
    }

    static async count (
        filter?: DbQueryFilter<Attributes>
    ): Promise<number> | never {
        const count = await countRecords<Attributes>(POSTS, filter);
        return count;
    }

    static async findAll (
        filter?: DbQueryFilter<Attributes>
    ): Promise<Post[]> | never {
        const records = await findAllRecords<Attributes, Item>(POSTS, filter);

        return records.map(record => Post.formatPropsAndInstantiate(
            record,
            filter?.include
        ));
    }

    static async findOne (
        filter: DbQueryFilter<Attributes>
    ): Promise<Post | null> | never {
        if (!filter.where) {
            return null;
        }

        const record = await findOneRecord<Attributes, Item>(POSTS, filter);

        return (record)
            ? Post.formatPropsAndInstantiate(record, filter?.include)
            : null;
    }

    static async findById (
        id: number,
        include?: Include[]
    ): Promise<Post | null> | never {
        const record = await findRecordById<Item>(POSTS, id, include);

        return (record)
            ? Post.formatPropsAndInstantiate(record, include)
            : null;
    }

    async save (): Promise<Post> | never {
        return this.updateAttributes(this);
    }

    async updateAttributes (
        props: Attributes
    ): Promise<Post> | never {
        const updatedProps = {
            ...props,
            updatedAt: new Date()
        };

        const record = await updateRecordAttributes<Attributes, Item>(
            POSTS,
            this.id,
            updatedProps
        );

        return Post.formatPropsAndInstantiate(record || this);
    }

    static formatPropsAndInstantiate (
        props: Attributes,
        include?: Include[]
    ): Post | never {
        const item = (include)
            ? separateIncludedAttributes(props, include)
            : props;

        if (!isPostItem(item)) {
            throw new PostError(INVALID_PROPS, UNPROCESSABLE_ENTITY);
        }

        return new Post(item);
    }
}

export default Post;
