import { Link } from "react-router-dom";
import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { POST } from "utils/const/pathnames";
import BaseButton from "components/BaseButton";
import Popup from "components/Popup";
import { defaultProps, propTypes } from "./Post.props";

import {
    clearAllErrors,
    getPostStart,
    updatePostReset
} from "redux/post/post.actions";

import {
    selectGottenPost,
    selectGottenPostError,
    selectUpdatedPost
} from "redux/post/post.selectors";

import { selectCurrentUser } from "redux/session/session.selectors";
import styles from "./Post.module.scss";
import translateError from "utils/helpers/translateError";

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

function Post ({
    currentUser,
    match,
    onClearAllErrors,
    onGetPostStart,
    onUpdatePostReset,
    post,
    postError,
    updatedPost
}) {
    const id = +match.params.id;

    const {
        author,
        body,
        createdAt,
        title,
        updatedAt
    } = post || {};

    const clearState = useCallback(() => onUpdatePostReset(), [onUpdatePostReset]);

    useEffect(() => {
        onGetPostStart(id);

        return () => {
            clearState();
            onClearAllErrors();
        };
    }, [clearState, onClearAllErrors, onGetPostStart, id]);

    const userIsAuthor = author?.id === currentUser?.id;
    const shouldRenderControls = Boolean(userIsAuthor && id);
    const updateIsSucceeded = Boolean(updatedPost);

    return (
        <article className={styles.container}>
            <header className={styles.title}>
                {title}
            </header>

            <section className={styles.body}>
                {body}
            </section>

            <section className={styles.metadata}>
                <img
                    alt={author?.name}
                    src=""
                />

                <span>
                    {author?.name}
                </span>

                <span className={styles.date}>
                    {updatedAt}
                </span>
            </section>

            {shouldRenderControls && (
                <section className={styles.controls}>
                    <Link
                        onClick={clearState}
                        to={`${POST}/${id}/edit`}
                    >
                        <BaseButton
                            title="Редактировать"
                        />
                    </Link>
                </section>
            )}

            {updateIsSucceeded && (
                <Popup
                    onClose={clearState}
                    text="Статья сохранена успешно"
                    theme="success"
                />
            )}

            {Boolean(postError) && (
                <Popup
                    onClose={clearAllErrors}
                    text={translateError(postError)}
                    theme="error"
                />
            )}
        </article>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    post: selectGottenPost,
    postError: selectGottenPostError,
    updatedPost: selectUpdatedPost
});

const mapDispatchToProps = (dispatch) => ({
    onClearAllErrors: () => dispatch(clearAllErrors()),
    onGetPostStart: (id) => dispatch(getPostStart(id)),
    onUpdatePostReset: () => dispatch(updatePostReset())
});

const ConnectedPost = connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);

export default ConnectedPost;
