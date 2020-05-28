import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { getPostStart } from "redux/post/post.actions";
import { defaultProps, propTypes } from "./Post.props";
import { selectCurrentUser } from "redux/user/user.selectors";
import { selectPost } from "redux/post/post.selectors";
// import DateFormatter from "utils/formatters/DateFormatter";
import styles from "./Post.module.scss";

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

function Post ({
    currentUser,
    match,
    onGetPostStart,
    post
}) {
    const id = +match.params.id;

    const {
        author,
        body,
        createdAt,
        title,
        updatedAt
    } = post || {};

    const userIsAuthor = author?.id === currentUser?.id;

    useEffect(() => {
        onGetPostStart(id);
    }, [id]);

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
        </article>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    post: selectPost
});

const mapDispatchToProps = (dispatch) => ({
    onGetPostStart: (id) => dispatch(getPostStart(id))
});

const ConnectedPost = connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);

export default ConnectedPost;
