import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { defaultProps, propTypes } from "./DraftEditor.props";
import { createPostStart, getPostStart } from "redux/post/post.actions";
import { selectCurrentUser } from "redux/user/user.selectors";
import BaseButton from "components/BaseButton";
import styles from "./DraftEditor.module.scss";

DraftEditor.defaultProps = defaultProps;
DraftEditor.propTypes = propTypes;

function DraftEditor ({
    currentUser,
    match,
    onCreatePostStart,
    onGetPostStart,
    post,
    postError // TODO: show popup
}) {
    const id = match.params.id && +match.params.id;

    const [currentPost, setCurrentPost] = useState({
        ...post,
        body: post.body || "",
        title: post.title || "",
        userId: currentUser.id
    });

    const handleChange = useCallback(({ target }) => {
        const { name, value } = target;

        setCurrentPost({
            ...currentPost,
            [name]: value
        });
    }, [post]);

    const handleSubmit = useCallback(event => {
        event.preventDefault();
        onCreatePostStart(currentPost);
    }, [post]); // TODO: it's object

    useEffect(() => {
        if (id) {
            onGetPostStart(id);
        }
    }, [id]); // can be undefined if "/draft"

    return (
        <article className={styles.container}>
            <form onSubmit={handleSubmit}>
                <header className={styles.title}>
                    <input
                        name="title"
                        onChange={handleChange}
                        type="text"
                        value={currentPost.title}
                    />
                </header>

                <section className={styles.body}>
                    <input
                        name="body"
                        onChange={handleChange}
                        type="text"
                        value={currentPost.body}
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
                    alt={currentPost.userId}
                    src=""
                />

                <span>
                    {currentPost.userId}
                </span>

                <span className={styles.date}>
                    
                </span>
            </section>
        </article>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
    onCreatePostStart: (props) => dispatch(createPostStart(props)),
    onGetPostStart: (id) => dispatch(getPostStart(id))
});

const ConnectedDraftEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(DraftEditor);

export default ConnectedDraftEditor;
