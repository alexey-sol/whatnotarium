import React from "react";

import BaseButton from "components/BaseButton";
import Popup from "components/Popup";
import { defaultProps, propTypes } from "./DraftEditor.component.props";
import styles from "./DraftEditor.module.scss";

DraftEditor.defaultProps = defaultProps;
DraftEditor.propTypes = propTypes;

function DraftEditor ({
    deletePost,
    hidePopup,
    handleChange,
    handleSubmit,
    isFetching,
    popupText,
    post
}) {
    return (
        <article className={styles.container}>
            <form onSubmit={handleSubmit}>
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
                        disabled={isFetching}
                        theme="light"
                        title="Сохранить"
                        type="submit"
                    />

                    <BaseButton
                        disabled={isFetching}
                        onClick={deletePost}
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

            {Boolean(popupText) && (
                <Popup
                    onClose={hidePopup}
                    text={popupText}
                    theme="error"
                />
            )}
        </article>
    );
}

export default DraftEditor;
