import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { POST } from "utils/const/pathnames";
import BaseButton from "components/BaseButton";
import Popup from "components/Popup";
import { defaultProps, propTypes } from "./Post.props";
import { deletePostReset, getPostStart, updatePostReset } from "redux/post/post.actions";
import { selectCurrentUser } from "redux/session/session.selectors";

import {
    selectDeletedPost,
    selectDeletedPostError,
    selectGottenPost,
    selectUpdatedPost,
    selectUpdatedPostError
} from "redux/post/post.selectors";

import styles from "./Post.module.scss";

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

function Post ({
    currentUser,
    deletedPost,
    deletedPostError,
    match,
    onDeletePostReset,
    onGetPostStart,
    onUpdatePostReset,
    post,
    updatedPost,
    updatedPostError
}) {
    const id = +match.params.id;

    const {
        author,
        body,
        createdAt,
        title,
        updatedAt
    } = post || {};

    const postIsDeleted = Boolean(deletedPost || deletedPostError);
    const [postDeletedIsShown, setPostDeletedIsShown] = useState(postIsDeleted);

    const postIsUpdated = Boolean(updatedPost || updatedPostError);
    const [postUpdatedIsShown, setPostUpdatedIsShown] = useState(postIsUpdated);

    useEffect(() => {
        onGetPostStart(id);

        return () => {
            onDeletePostReset();
            onUpdatePostReset();
        };
    }, [
        id,
        onDeletePostReset,
        onGetPostStart,
        onUpdatePostReset
    ]);

    const userIsAuthor = author?.id === currentUser?.id;
    const shouldRenderControls = Boolean(userIsAuthor && id);

    const postDeletedPopupText = (deletedPost)
        ? "Статья удалена"
        : "Ошибка при удалении статьи";

    const postDeletedPopupTheme = (deletedPost)
        ? "success"
        : "error";

    const postUpdatedPopupText = (updatedPost)
        ? "Статья сохранена успешно"
        : "Ошибка при сохранении статьи";

    const postUpdatedPopupTheme = (updatedPost)
        ? "success"
        : "error";

    // TODO: fix a bug. Update post. Then click "edit" in Post component.

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
                    <Link to={`${POST}/${id}/edit`}>
                        <BaseButton
                            title="Редактировать"
                        />
                    </Link>
                </section>
            )}

            {postDeletedIsShown && (
                <Popup
                    onClose={() => setPostDeletedIsShown(false)}
                    text={postDeletedPopupText}
                    theme={postDeletedPopupTheme}
                />
            )}

            {postUpdatedIsShown && (
                <Popup
                    onClose={() => setPostUpdatedIsShown(false)}
                    text={postUpdatedPopupText}
                    theme={postUpdatedPopupTheme}
                />
            )}
        </article>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    deletedPost: selectDeletedPost,
    deletedPostError: selectDeletedPostError,
    post: selectGottenPost,
    updatedPost: selectUpdatedPost,
    updatedPostError: selectUpdatedPostError
});

const mapDispatchToProps = (dispatch) => ({
    onDeletePostReset: () => dispatch(deletePostReset()),
    onGetPostStart: (id) => dispatch(getPostStart(id)),
    onUpdatePostReset: () => dispatch(updatePostReset())
});

const ConnectedPost = connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);

export default ConnectedPost;
