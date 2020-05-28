import { UNPROCESSABLE_ENTITY } from "http-status";

import {
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
import { PostFormatter } from "#utils/formatters/ModelFormatter";
import DbQueryFilter from "#types/DbQueryFilter";
import FormattedProps from "#types/post/FormattedProps";
import Model from "#types/Model";
import PostError from "#utils/errors/PostError";
import PostProps from "#types/post/PostProps";
import RawProps from "#types/post/RawProps";
import formatDbQueryFilter from "#utils/formatters/formatDbQueryFilter";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";
import isPostProps from "#utils/typeGuards/isPostProps";

class Post implements Model<FormattedProps, Post> {
    static formatter = new PostFormatter();

    body: string
    createdAt: Date;
    id: number
    title: string;
    updatedAt: Date;
    userId: number;

    private constructor (props: PostProps) {
        this.body = props.body;
        this.createdAt = props.createdAt;
        this.id = props.id;
        this.title = props.title;
        this.updatedAt = props.updatedAt;
        this.userId = props.userId;
    }

    static async up (): Promise<void> {
        await generateSqlAndQuery(new CreatePostsTable());
    }

    static async create (
        props: FormattedProps
    ): Promise<Post> | never {
        const {
            createdAt = new Date(),
            updatedAt = new Date()
        } = props;

        const propsToDb = Post.formatter.toDbCase({
            ...props,
            createdAt,
            updatedAt
        });

        const record = await createRecord<RawProps, PostProps>(
            POSTS,
            propsToDb
        );

        return Post.formatPropsAndInstantiate(record);
    }

    static async destroyById (
        id: number
    ): Promise<number | null> | never {
        return destroyRecordById<PostProps>(POSTS, id);
    }

    static async findAll (
        filter?: DbQueryFilter<FormattedProps>
    ): Promise<Post[]> | never {
        const updatedFilter = formatDbQueryFilter(Post.formatter, filter);

        const records = await findAllRecords<RawProps, PostProps>(
            POSTS,
            updatedFilter
        );

        return records.map(record => Post.formatPropsAndInstantiate(record));
    }

    static async findOne (
        filter: DbQueryFilter<FormattedProps>
    ): Promise<Post | null> | never {
        if (!filter.where) {
            return null;
        }

        const updatedFilter = formatDbQueryFilter(Post.formatter, filter);

        const record = await findOneRecord<RawProps, PostProps>(
            POSTS,
            updatedFilter
        );

        return (record)
            ? Post.formatPropsAndInstantiate(record)
            : null;
    }

    static async findById (
        id: number
    ): Promise<Post | null> | never {
        const record = await findRecordById<PostProps>(POSTS, id);

        return (record)
            ? Post.formatPropsAndInstantiate(record)
            : null;
    }

    async save (): Promise<Post> | never {
        return this.updateAttributes({
            ...this,
            updatedAt: new Date()
        });
    }

    async updateAttributes (
        props: FormattedProps
    ): Promise<Post> | never {
        const {
            updatedAt = new Date()
        } = props;

        const propsToDb = Post.formatter.toDbCase({
            ...props,
            updatedAt
        });

        const record = await updateRecordAttributes<RawProps, PostProps>(
            POSTS,
            this.id,
            propsToDb
        );

        return Post.formatPropsAndInstantiate(record);
    }

    static formatPropsAndInstantiate (
        props: RawProps
    ): Post | never {
        const propsFromDb = Post.formatter.fromDbCase(props);

        if (!isPostProps(propsFromDb)) {
            throw new PostError(INVALID_PROPS, UNPROCESSABLE_ENTITY);
        }

        return new Post(propsFromDb);
    }
}

export default Post;
