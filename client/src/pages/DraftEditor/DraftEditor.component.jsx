import React, { useCallback, useEffect, useState } from "react";

import { POST, PROFILE } from "utils/const/pathnames";
import BaseButton from "components/BaseButton";
import Popup from "components/Popup";
import { defaultProps, propTypes } from "./DraftEditor.props";

import styles from "./DraftEditor.module.scss";
import translateError from "utils/helpers/translateError";

DraftEditor.defaultProps = defaultProps;
DraftEditor.propTypes = propTypes;

function DraftEditor ({
    createdPost,
    createdPostError,
    createdPostPending,
    currentUser,
    deletedPost,
    deletedPostError,
    deletedPostPending,
    gottenPost,
    gottenPostError,
    history,
    match,
    onClearAllErrors,
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
    const shouldClearStateForNewDraft = !id && Boolean(gottenPost);

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
        const postWithUserId = {
            ...post,
            userId: currentUser.id
        };

        if (shouldCreateNewPost) {
            onCreatePostStart(postWithUserId);
        } else {
            onUpdatePostStart(postWithUserId);
        }
    };

    const redirectToPost = useCallback(() => {
        push(`${POST}/${id}`);
    }, [id, push]);

    const redirectToProfile = useCallback(() => {
        push(PROFILE);
    }, [push]);

    const creationIsSucceeded = Boolean(createdPost);
    const deletionIsSucceeded = Boolean(deletedPost);
    const updateIsSucceded = Boolean(updatedPost);

    const shouldFetchPost = id && !post;
    const shouldRedirectToPost = Boolean(id) && updateIsSucceded;
    const shouldRedirectToProfile = Boolean(deletionIsSucceeded || creationIsSucceeded);

    useEffect(() => {
        if (shouldClearStateForNewDraft) {
            setPost({});
        }
    }, [shouldClearStateForNewDraft]);

    useEffect(() => {
        if (shouldRedirectToPost) {
            redirectToPost();
        } else if (shouldRedirectToProfile) {
            redirectToProfile();
        }

        return () => onClearAllErrors();
    }, [
        onClearAllErrors,
        redirectToPost,
        redirectToProfile,
        shouldRedirectToPost,
        shouldRedirectToProfile
    ]);

    useEffect(() => {
        if (shouldFetchPost) {
            onGetPostStart(id);
        }
    }, [id, onGetPostStart, shouldFetchPost]);


    const pending =
        createdPostPending?.pending ||
        deletedPostPending?.pending ||
        updatedPostPending?.pending;

    const failedRequestMessage = translateError(
        createdPostError ||
        deletedPostError ||
        gottenPostError ||
        updatedPostError
    );

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

            {Boolean(failedRequestMessage) && (
                <Popup
                    onClose={onClearAllErrors}
                    text={failedRequestMessage}
                    theme="error"
                />
            )}
        </article>
    );
}
export default DraftEditor;
