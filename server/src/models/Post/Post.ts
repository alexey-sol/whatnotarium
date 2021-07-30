import { UNPROCESSABLE_ENTITY } from "http-status";
import trimHtml from "trim-html";

import {
    countRecords,
    createRecord,
    destroyAllRecords,
    findAllRecords,
    findOneRecord,
    updateRecordAttributes
} from "#utils/sql/Model";

import {
    CreateFullPostsView,
    CreatePostCommentsTable,
    CreatePostVotesTable,
    CreatePostsTable
} from "#utils/sql/SchemaSqlGenerator";

import { FULL_POSTS_VIEW } from "#utils/const/database/viewNames";
import { INVALID_PROPS } from "#utils/const/validationErrors";
import { POST_EXCERPT_MAX_LENGTH } from "#utils/const/defaultValues";
import { POST_VOTES, POSTS } from "#utils/const/database/tableNames";
import Attributes from "#types/post/Attributes";
import Comment from "#types/Comment";
import DbQueryFilter from "#types/DbQueryFilter";
import Include from "#types/Include";
import Item from "#types/post/Item";
import Model from "#types/Model";
import PostError from "#utils/errors/PostError";
import PostVote from "#types/PostVote";
import Profile from "#types/UserProfile";
import UpdatePostVoteDto from "#types/post/UpdatePostVoteDto";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";
import isPostItem from "#utils/typeGuards/isPostItem";
import separateIncludedAttributes from "#utils/helpers/separateIncludedAttributes";

class Post implements Model<Attributes, Post> {
    static tableName = POSTS;

    author: Profile;
    body: string;
    comments: Comment[];
    createdAt: Date;
    excerpt: string;
    id: number;
    isApproved: boolean;
    isFrozen: boolean;
    rating: number;
    title: string;
    updatedAt: Date;
    userId: number;
    userIdsVotedDown: number[];
    userIdsVotedUp: number[];
    viewCount: number;

    private constructor (props: Item) {
        this.author = props.author;
        this.body = props.body;
        this.comments = props.comments;
        this.createdAt = props.createdAt;
        this.excerpt = props.excerpt;
        this.id = props.id;
        this.isApproved = props.isApproved;
        this.isFrozen = props.isFrozen;
        this.rating = props.rating;
        this.title = props.title;
        this.updatedAt = props.updatedAt;
        this.userId = props.userId;
        this.userIdsVotedDown = props.userIdsVotedDown;
        this.userIdsVotedUp = props.userIdsVotedUp;
        this.viewCount = props.viewCount;
    }

    static async up (): Promise<void> {
        await generateSqlAndQuery(new CreatePostsTable());
        await generateSqlAndQuery(new CreatePostVotesTable());
        await generateSqlAndQuery(new CreatePostCommentsTable());
        await generateSqlAndQuery(new CreateFullPostsView());
    }

    static async create (
        props: Attributes,
        include?: Include[]
    ): Promise<Post> | never {
        const record = await createRecord<Attributes, Item>(POSTS, {
            ...props,
            excerpt: Post.deriveExcerpt(props)
        });

        return (include)
            ? Post.findById(record.id, include) as Promise<Post>
            : Post.formatPropsAndInstantiate(record);
    }

    static async destroyAll (
        filter: DbQueryFilter<Attributes>
    ): Promise<number | null> | never {
        if (!filter.where) {
            return null;
        }

        return destroyAllRecords<Attributes, Item>(POSTS, filter);
    }

    static async destroyById (
        id: number
    ): Promise<number | null> | never {
        const where = { id };
        return Post.destroyAll({ where });
    }

    static async count (
        filter?: DbQueryFilter<Attributes>
    ): Promise<number> | never {
        return countRecords<Attributes>(POSTS, filter);
    }

    static async findAll (
        filter?: DbQueryFilter<Attributes>
    ): Promise<Post[]> | never {
        const records = await findAllRecords<Attributes, Item>(FULL_POSTS_VIEW, filter);

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

        const record = await findOneRecord<Attributes, Item>(FULL_POSTS_VIEW, filter);

        return (record)
            ? Post.formatPropsAndInstantiate(record, filter?.include)
            : null;
    }

    static async findById (
        id: number,
        include?: Include[]
    ): Promise<Post | null> | never {
        const where = { id };
        return Post.findOne({ include, where });
    }

    async updateAttributes (
        props: Attributes,
        include?: Include[],
        options?: { skipUpdatedAt?: boolean }
    ): Promise<Post> | never {
        const updatedProps = { ...props };

        if (!options?.skipUpdatedAt) {
            updatedProps.updatedAt = new Date();
        }

        if (props.body) {
            updatedProps.excerpt = Post.deriveExcerpt(props);
        }

        const record = await updateRecordAttributes<Attributes, Item>(
            POSTS,
            this.id,
            updatedProps
        );

        return (include)
            ? Post.findById(this.id, include) as Promise<Post>
            : Post.formatPropsAndInstantiate(record || this);
    }

    async updateVote (
        props: UpdatePostVoteDto,
        include?: Include[]
    ): Promise<Post | null> | never {
        const { value, userId } = props;

        const where = {
            postId: this.id,
            userId
        };

        await destroyAllRecords(POST_VOTES, { where });

        if (value !== 0) {
            await createRecord<unknown, PostVote>(POST_VOTES, { ...where, value });
        }

        return (include)
            ? Post.findById(this.id, include) as Promise<Post>
            : Post.formatPropsAndInstantiate(this);
    }

    static deriveExcerpt (
        props: Attributes
    ): string | undefined {
        if (props.body) {
            const { html } = trimHtml(props.body, { limit: POST_EXCERPT_MAX_LENGTH });
            return html;
        }
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
