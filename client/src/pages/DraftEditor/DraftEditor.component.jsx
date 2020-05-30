import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
    createPostStart,
    deletePostStart,
    getPostStart,
    updatePostReset,
    updatePostStart
} from "redux/post/post.actions";

import { POST } from "utils/const/pathnames";
import BaseButton from "components/BaseButton";
import { defaultProps, propTypes } from "./DraftEditor.props";

import {
    selectDeletedPost,
    selectDeletedPostError,
    selectGottenPost,
    selectGottenPostError,
    selectUpdatedPost,
    selectUpdatedPostError
} from "redux/post/post.selectors";

import {
    selectDeletedPostPending,
    selectUpdatedPostPending
} from "redux/pending/pending.selectors";

import styles from "./DraftEditor.module.scss";

DraftEditor.defaultProps = defaultProps;
DraftEditor.propTypes = propTypes;

function DraftEditor ({
    deletedPost,
    deletedPostError,
    deletedPostPending,
    gottenPost,
    gottenPostError, // TODO: show popup
    history,
    match,
    onCreatePostStart,
    onDeletePostStart,
    onGetPostStart,
    onUpdatePostStart,
    updatedPost,
    updatedPostError,
    updatedPostPending
}) {
    const { push } = history;
    const id = match.params.id && +match.params.id;
    const [post, setPost] = useState(updatedPost || gottenPost);

    const handleChange = useCallback(({ target }) => {
        const { name, value } = target;

        setPost({
            ...post,
            [name]: value
        });
    }, [post]);

    const createOrUpdatePost = (event) => {
        event.preventDefault();

        const shouldCreateNewPost = !id;

        if (shouldCreateNewPost) {
            onCreatePostStart(post);
        } else {
            onUpdatePostStart(post);
        }
    };

    const shouldFetchPost = id && !post;
    const deleteIsSuccessOrFail = Boolean(deletedPost || deletedPostError);
    const updateIsSuccessOrFail = Boolean(updatedPost || updatedPostError);

    const redirect = useCallback(() => {
        push(`${POST}/${id}`);
    }, [id, push]);

    useEffect(() => {
        if (deleteIsSuccessOrFail || updateIsSuccessOrFail) {
            redirect();
        }
    }, [redirect, deleteIsSuccessOrFail, updateIsSuccessOrFail]);

    useEffect(() => {
        if (shouldFetchPost) {
            onGetPostStart(id);
        }
    }, [id, onGetPostStart, shouldFetchPost]);

    const pending = deletedPostPending?.pending || updatedPostPending?.pending;

    return (
        <article className={styles.container}>
            <form onSubmit={createOrUpdatePost}>
                <header className={styles.title}>
                    <input
                        name="title"
                        onChange={handleChange}
                        type="text"
                        value={post?.title ?? ""}
                    />
                </header>

                <section className={styles.body}>
                    <input
                        name="body"
                        onChange={handleChange}
                        type="text"
                        value={post?.body || ""}
                    />
                </section>

                <section className={styles.controls}>
                    <BaseButton
                        disabled={pending}
                        theme="light"
                        title="Сохранить"
                        type="submit"
                    />

                    <BaseButton
                        disabled={pending}
                        onClick={() => onDeletePostStart(id)}
                        theme="dark"
                        title="Удалить"
                        type="button"
                    />
                </section>

            </form>

            <section className={styles.metadata}>
                <img
                    alt={post?.author?.name}
                    src=""
                />

                <span>
                    {post?.userId}
                </span>

                <span className={styles.date}>
                    {post?.updatedAt}
                </span>
            </section>
        </article>
    );
}

const mapStateToProps = createStructuredSelector({
    deletedPost: selectDeletedPost,
    deletedPostError: selectDeletedPostError,
    deletedPostPending: selectDeletedPostPending,
    gottenPost: selectGottenPost,
    gottenPostError: selectGottenPostError,
    updatedPost: selectUpdatedPost,
    updatedPostError: selectUpdatedPostError,
    updatedPostPending: selectUpdatedPostPending
});

const mapDispatchToProps = (dispatch) => ({
    onCreatePostStart: (props) => dispatch(createPostStart(props)),
    onDeletePostStart: (id) => dispatch(deletePostStart(id)),
    onGetPostStart: (id) => dispatch(getPostStart(id)),
    onUpdatePostReset: () => dispatch(updatePostReset()),
    onUpdatePostStart: (props) => dispatch(updatePostStart(props))
});

const ConnectedDraftEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(DraftEditor);

export default ConnectedDraftEditor;
