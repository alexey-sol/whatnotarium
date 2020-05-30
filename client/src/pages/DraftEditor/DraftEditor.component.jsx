import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
    createPostStart,
    getPostStart,
    updatePostReset,
    updatePostStart
} from "redux/post/post.actions";

import { POST } from "utils/const/pathnames";
import BaseButton from "components/BaseButton";
import { defaultProps, propTypes } from "./DraftEditor.props";
import { selectCurrentUser } from "redux/session/session.selectors";

import {
    selectGottenPost,
    selectGottenPostError,
    selectUpdatedPost,
    selectUpdatedPostError
} from "redux/post/post.selectors";

import styles from "./DraftEditor.module.scss";

DraftEditor.defaultProps = defaultProps;
DraftEditor.propTypes = propTypes;

function DraftEditor ({
    currentUser,
    gottenPost,
    gottenPostError, // TODO: show popup. Maybe globally?
    history,
    match,
    onCreatePostStart,
    onGetPostStart,
    onUpdatePostReset,
    onUpdatePostStart,
    updatedPost,
    updatedPostError // TODO: show popup
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
    const updateIsSuccessful = Boolean(updatedPost);

    const clearUpdatedPostAndRedirect = useCallback(() => {
        onUpdatePostReset();
        push(`${POST}/${id}`);
    }, [id, onUpdatePostReset, push]);

    useEffect(() => {
        if (updateIsSuccessful) {
            clearUpdatedPostAndRedirect(); // TODO: popup success
        }
    }, [clearUpdatedPostAndRedirect, updateIsSuccessful]);

    useEffect(() => {
        if (shouldFetchPost) {
            onGetPostStart(id);
        }
    }, [id, onGetPostStart, shouldFetchPost]);

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

                <BaseButton
                    className={styles.saveButton}
                    theme="dark"
                    title="Сохранить"
                    type="submit"
                />
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
    currentUser: selectCurrentUser,
    gottenPost: selectGottenPost,
    gottenPostError: selectGottenPostError,
    updatedPost: selectUpdatedPost,
    updatedPostError: selectUpdatedPostError
});

const mapDispatchToProps = (dispatch) => ({
    onCreatePostStart: (props) => dispatch(createPostStart(props)),
    onGetPostStart: (id) => dispatch(getPostStart(id)),
    onUpdatePostReset: () => dispatch(updatePostReset()),
    onUpdatePostStart: (props) => dispatch(updatePostStart(props))
});

const ConnectedDraftEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(DraftEditor);

export default ConnectedDraftEditor;
