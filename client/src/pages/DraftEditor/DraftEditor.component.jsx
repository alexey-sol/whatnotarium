import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
    createPostStart,
    getPostStart,
    updatePostStart
} from "redux/post/post.actions";

import { POST } from "utils/const/pathnames";
import BaseButton from "components/BaseButton";
import { defaultProps, propTypes } from "./DraftEditor.props";
import { resetPost } from "redux/post/post.actions";
import { selectCurrentUser } from "redux/user/user.selectors";
import { selectPost } from "redux/post/post.selectors";
import styles from "./DraftEditor.module.scss";

DraftEditor.defaultProps = defaultProps;
DraftEditor.propTypes = propTypes;

function DraftEditor ({
    currentUser,
    history,
    match,
    onCreatePostStart,
    onGetPostStart,
    onResetPost,
    onUpdatePostStart,
    post,
    postError // TODO: show popup
}) {
    const id = match.params.id && +match.params.id;
    const [currentPost, setCurrentPost] = useState(null);

    const handleChange = useCallback(({ target }) => {
        const { name, value } = target;

        setCurrentPost({
            ...currentPost,
            [name]: value
        });
    }, [currentPost]);

    const createOrUpdatePost = (event) => {
        event.preventDefault();

        const shouldCreateNewPost = !id;

        if (shouldCreateNewPost) {
            onCreatePostStart(currentPost);
        } else {
            onUpdatePostStart(currentPost);
        }
    };

    const shouldFetchPost = id && !post && !currentPost;
    const shouldSetCurrentPost = Boolean(post && !currentPost);

    // const shouldRedirect = Boolean(currentPost && !post);

    useEffect(() => {
        // if (shouldRedirect) {
        //     history.push(`${POST}/${id}`);
        // }
    }, [id]);

    useEffect(() => {
        if (shouldFetchPost) {
            onGetPostStart(id);
        }

        if (shouldSetCurrentPost) {
            setCurrentPost(post);
            onResetPost();
        }
    }, [id, onGetPostStart, onResetPost, shouldFetchPost, shouldSetCurrentPost, post]);

    return (
        <article className={styles.container}>
            <form onSubmit={createOrUpdatePost}>
                <header className={styles.title}>
                    <input
                        name="title"
                        onChange={handleChange}
                        type="text"
                        value={currentPost?.title ?? ""}
                    />
                </header>

                <section className={styles.body}>
                    <input
                        name="body"
                        onChange={handleChange}
                        type="text"
                        value={currentPost?.body || ""}
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
                    alt={currentPost?.userId}
                    src=""
                />

                <span>
                    {currentPost?.userId}
                </span>

                <span className={styles.date}>
                    
                </span>
            </section>
        </article>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    post: selectPost
});

const mapDispatchToProps = (dispatch) => ({
    onCreatePostStart: (props) => dispatch(createPostStart(props)),
    onGetPostStart: (id) => dispatch(getPostStart(id)),
    onResetPost: () => dispatch(resetPost()),
    onUpdatePostStart: (props) => dispatch(updatePostStart(props))
});

const ConnectedDraftEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(DraftEditor);

export default ConnectedDraftEditor;
