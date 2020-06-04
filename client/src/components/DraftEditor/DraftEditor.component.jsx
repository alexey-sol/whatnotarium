
import { Editor } from "@tinymce/tinymce-react";
import React, { useCallback, useRef, useState } from "react";
import classnames from "classnames";

import { POST_BODY_LENGTH, POST_TITLE_LENGTH } from "utils/const/limits";
import BaseButton from "components/BaseButton";
import DateFormatter from "utils/formatters/DateFormatter";
import DOMPurify from "dompurify";
import Input from "components/Input";
import Popup from "components/Popup";
import Spinner from "components/Spinner";
import StringFormatter from "utils/formatters/StringFormatter";
import { defaultProps, propTypes } from "./DraftEditor.component.props";
import styles from "./DraftEditor.module.scss";

const tinyApiKey = process.env.REACT_APP_TINY_API_KEY;

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
    const countRef = useRef(null);
    const [editor, setEditor] = useState(null);

    const editorContainerClassName = classnames(
        styles.editorContainer,
        (editor) ? styles.fadedIn : styles.hidden
    );

    // TODO: (validation) set max length for title and body inputs
    // TODO: dialog on delete
    // autosave on unmount?

    const handleTitleChange = useCallback(({ target }) => {
        handleChange(target);
    }, [handleChange]);

    const handleBodyChange = useCallback(content => {
        handleChange({
            name: "body",
            value: DOMPurify.sanitize(content)
        });
    }, [handleChange]);

    const formattedUpdatedAt = new DateFormatter(post?.updatedAt)
        .formatByPattern("YYYY, MMM DD");

    const plainText = new StringFormatter(post?.body)
        .removeHtmlTags()
        .removeLineBreaks()
        .string;

    const charsRemainingForBody = POST_BODY_LENGTH - plainText.length;

    return (
        <article className={styles.container}>
            {!editor && (
                <Spinner />
            )}

            <section className={editorContainerClassName}>
                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >
                    <header className={styles.title}>
                        <Input
                            className={styles.input}
                            name="title"
                            onChange={handleTitleChange}
                            rootClassName={styles.inputContainer}
                            type="text"
                            value={post?.title || ""}
                        />
                    </header>

                    <section className={styles.body}>
                        <Editor
                            apiKey={tinyApiKey}
                            initialValue={post?.body || ""}
                            init={getEditorInitOptions(setEditor)}
                            onEditorChange={handleBodyChange}
                            textareaName="body"
                        />
                    </section>

                    <section className={styles.metadata}>
                        <span className={styles.date}>
                            {`Изменено: ${formattedUpdatedAt}`}
                        </span>

                        <span className={styles.charsCount}>
                            {`${charsRemainingForBody} символов осталось`}
                        </span>
                    </section>

                    <section className={styles.controls}>
                        <BaseButton
                            disabled={isFetching}
                            onClick={deletePost}
                            theme="dark"
                            title="Удалить"
                            type="button"
                        />

                        <BaseButton
                            disabled={isFetching}
                            theme="light"
                            title="Сохранить"
                            type="submit"
                        />
                    </section>
                </form>

                {Boolean(popupText) && (
                    <Popup
                        onClose={hidePopup}
                        text={popupText}
                        theme="error"
                    />
                )}
            </section>
        </article>
    );
}

export default DraftEditor;

function getEditorInitOptions (setEditor) {
    const contentStyle = `body {
        font-family: Roboto, Helvetica, Arial, sans-serif;
        font-size: 16px;
        color: #141414;
    }`;

    const plugins = [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table paste code help wordcount"
    ];

    const toolbar = `formatselect | bold italic underline code |
        alignleft aligncenter alignright alignjustify |
        bullist numlist | removeformat"`;

    return {
        content_style: contentStyle,
        height: 500,
        menubar: false,
        min_height: 200,
        min_width: 300,
        plugins,
        resize: false,
        setup: (editor) => {
            editor.on("init", () => setEditor(editor));
        },
        statusbar: false,
        toolbar
    };
}
