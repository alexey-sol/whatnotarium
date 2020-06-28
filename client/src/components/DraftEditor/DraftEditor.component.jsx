
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
import Tooltip from "components/Tooltip";
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
    isPending,
    popupText,
    post
}) {
    const [editor, setEditor] = useState(null);
    const [bodyLength, setBodyLength] = useState(0);

    const charsCountRef = useRef(null);

    const editorContainerClassName = classnames(
        styles.editorContainer,
        (editor) ? styles.fadedIn : styles.hidden
    );

    const handleTitleChange = useCallback(({ target }) => {
        handleChange(target);
    }, [handleChange]);

    const handleBodyChange = useCallback(content => {
        const plainText = new StringFormatter(content)
            .removeHtmlTags()
            .removeLineBreaks()
            .string;

        setBodyLength(plainText.length);

        handleChange({
            name: "body",
            value: DOMPurify.sanitize(content)
        });
    }, [handleChange]);

    const formattedUpdatedAt = new DateFormatter(post?.updatedAt)
        .formatByPattern("YYYY, MMM DD");

    const bodyLengthIsTooLong = bodyLength > POST_BODY_LENGTH;
    // const bodyDidChange = bodyLength > 0;
    const deleteButtonIsDisabled = isPending || !post?.id;
    const saveButtonIsDisabled = isPending || bodyLengthIsTooLong;
    const shouldHideCharsCount = bodyLength > 0;

    const charsCountClassName = classnames(
        styles.charsCount,
        (shouldHideCharsCount) ? "" : styles.hidden,
        (bodyLengthIsTooLong) ? styles.bodyError : ""
    );

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

                        <span
                            className={charsCountClassName}
                            ref={charsCountRef}
                        >
                            {`${bodyLength}/${POST_BODY_LENGTH} символов введено`}
                        </span>
                    </section>

                    <section className={styles.controls}>
                        <BaseButton
                            disabled={deleteButtonIsDisabled}
                            onClick={deletePost}
                            text="Удалить"
                            theme="dark"
                            type="button"
                        />

                        <BaseButton
                            disabled={saveButtonIsDisabled}
                            text="Сохранить"
                            theme="light"
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

                {bodyLengthIsTooLong && (
                    <Tooltip
                        elemRef={charsCountRef}
                        text="Чтобы сохранить статью, пожалуйста, удалите лишние символы"
                        width="large"
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
        "searchreplace visualblocks fullscreen",
        "insertdatetime media table paste help wordcount"
    ];

    const toolbar = `formatselect | bold italic underline |
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
        setup: (editor) => editor.on("init", () => setEditor(editor)),
        statusbar: false,
        toolbar
    };
}
