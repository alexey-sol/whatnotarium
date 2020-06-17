
import { Editor } from "@tinymce/tinymce-react";
import React, { useCallback, useState } from "react";
import classnames from "classnames";

import { POST_TITLE_LENGTH } from "utils/const/limits";
import BaseButton from "components/BaseButton";
import DateFormatter from "utils/formatters/DateFormatter";
import DOMPurify from "dompurify";
import Input from "components/Input";
import Popup from "components/Popup";
import Spinner from "components/Spinner";
import StringFormatter from "utils/formatters/StringFormatter";
import { defaultProps, propTypes } from "./DraftEditor.component.props";
import styles from "./DraftEditor.module.scss";

const POST_BODY_LENGTH = Infinity;

const tinyApiKey = process.env.REACT_APP_TINY_API_KEY;

let charCount = 0;

DraftEditor.defaultProps = defaultProps;
DraftEditor.propTypes = propTypes;

function DraftEditor ({
    deletePost,
    hidePopup,
    handleChange,
    handleSubmit,
    isPending,
    popupText,
    post
}) {
    const [editor, setEditor] = useState(null);

    const editorContainerClassName = classnames(
        styles.editorContainer,
        (editor) ? styles.fadedIn : styles.hidden
    );

    // TODO: (validation) set max length for title and body inputs
    // TODO: dialog on delete
    // autosave on unmount?

    const plainText = new StringFormatter(post?.body)
        .removeHtmlTags()
        .removeLineBreaks()
        .string;

    const charsRemainingForBody = POST_BODY_LENGTH - plainText.length;

    charCount = plainText.length;

    const handleTitleChange = useCallback(({ target }) => {
        handleChange(target);
    }, [handleChange]);

    const handleBodyChange = useCallback(content => { // TODO: on copy/paste?
        let cutContent = "";

        // if (plainText.length < POST_BODY_LENGTH) {
        // }

        if (plainText.length > POST_BODY_LENGTH) {
            const lastIndex = POST_BODY_LENGTH - 1;
            cutContent = content.slice(0, lastIndex);
        }

        handleChange({
            name: "body",
            value: DOMPurify.sanitize(cutContent || content)
        });
    }, [handleChange, plainText]);

    const formattedUpdatedAt = new DateFormatter(post?.updatedAt)
        .formatByPattern("YYYY, MMM DD");

    const deleteButtonIsDisabled = isPending || !post?.id;

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
                            max={POST_TITLE_LENGTH}
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

                        {false && (
                            <span className={styles.charsCount}>
                                {`${charsRemainingForBody} символов осталось`}
                            </span>
                        )}
                    </section>

                    <section className={styles.controls}>
                        <BaseButton
                            disabled={deleteButtonIsDisabled}
                            onClick={deletePost}
                            theme="dark"
                            title="Удалить"
                            type="button"
                        />

                        <BaseButton
                            disabled={isPending}
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
            editor.on("paste", (event) => { // TODO!
                // https://stackoverflow.com/questions/15573561/javascript-prevent-copy-pasting-beyond-character-limit-in-textarea
            });
            editor.on("keydown", (event) => {
                const isPrintableChar = event.which >= 0x20;

                if (!isPrintableChar) {
                    return;
                }

                if (charCount >= POST_BODY_LENGTH) {
                    event.preventDefault();
                }
            });
        },
        statusbar: false,
        toolbar
    };
}
