import DOMPurify from "dompurify";

import React, {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

import { Redirect, withRouter } from "react-router";
import classnames from "classnames";

import * as p from "utils/const/pathnames";
import { BODY, SKIP_PREMODERATION, TITLE } from "utils/const/postData";
import { POST_BODY_LENGTH, POST_TITLE_LENGTH } from "utils/const/limits";
import { RESET_POST } from "utils/const/events";
import BaseButton from "components/BaseButton";
import Checkbox from "components/Checkbox";
import DateFormatter from "utils/formatters/DateFormatter";
import Editor from "components/Editor";
import Input from "components/Input";
import Spinner from "components/Spinner";
import StringFormatter from "utils/formatters/StringFormatter";
import Tooltip from "components/Tooltip";
import { defaultProps, propTypes } from "./DraftEditor.component.props";
import pubsub from "utils/pubsub";
import styles from "./DraftEditor.module.scss";

DraftEditor.defaultProps = defaultProps;
DraftEditor.propTypes = propTypes;

function DraftEditor ({
    deletePost,
    handleChange,
    handleSubmit,
    isPending,
    match,
    post,
    setSelectedPost
}) {
    const paramId = match.params.id;
    const charsCountRef = useRef(null);
    const [editor, setEditor] = useState(null);
    const [bodyLength, setBodyLength] = useState(0);

    const editorContainerClassName = classnames(
        styles.editorContainer,
        (editor) ? styles.fadedIn : styles.hidden
    );

    const handleSkipPremodChange = useCallback(({ target }) => {
        handleChange({
            name: SKIP_PREMODERATION,
            value: target.checked
        });
    }, [handleChange]);

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
            name: BODY,
            value: DOMPurify.sanitize(content)
        });
    }, [handleChange]);

    const formattedUpdatedAt = new DateFormatter(post?.updatedAt)
        .formatByPattern("YYYY, MMM DD");

    const isFrozenPost = post?.isFrozen || false;
    const isRejectedPost = post?.isFrozen === false && post?.isApproved === false;
    const bodyLengthIsTooLong = bodyLength > POST_BODY_LENGTH;
    const deleteButtonIsDisabled = isPending || !post?.id || isFrozenPost;
    const saveButtonIsDisabled = isPending || bodyLengthIsTooLong || isFrozenPost;
    const shouldHideCharsCount = bodyLength > 0;

    const charsCountClassName = classnames(
        styles.charsCount,
        (shouldHideCharsCount) ? "" : styles.hidden,
        (bodyLengthIsTooLong) ? styles.bodyError : ""
    );

    const resetPost = useCallback(() => {
        // That's funny but the order here matters. Editor should be reset first.
        // Otherwise editor content and title will be reset one by one, not
        // simultaneously.

        if (editor) {
            editor.resetContent();
        }

        setSelectedPost(null);
    }, [editor, setSelectedPost]);

    useEffect(() => {
        pubsub.subscribe(RESET_POST, resetPost);
        return () => pubsub.unsubscribe(RESET_POST, resetPost);
    }, [resetPost]);

    if (isFrozenPost) {
        return <Redirect to={`/${p.POST}/${paramId}`} />;
    }

    return (
        <article className={styles.container}>
            {!editor && <Spinner />}

            <section className={editorContainerClassName}>
                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >
                    <header className={styles.title}>
                        <Input
                            className={styles.input}
                            max={POST_TITLE_LENGTH}
                            name={TITLE}
                            onChange={handleTitleChange}
                            rootClassName={styles.inputContainer}
                            type="text"
                            value={post?.title || ""}
                        />
                    </header>

                    <section className={styles.body}>
                        <Editor
                            content={post?.body}
                            handleChange={handleBodyChange}
                            setEditor={setEditor}
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

                    {!paramId && (
                        <Checkbox
                            label="Пропустить этап премодерации"
                            name={SKIP_PREMODERATION}
                            rootClassName={styles.skipPremodCheckbox}
                            onChange={handleSkipPremodChange}
                        />
                    )}

                    {isRejectedPost && (
                        <section className={styles.warning}>
                            Пожалуйста, обратите внимание, что после сохранения вы больше не
                            сможете редактировать статью - до того момента, пока мы не вынесем
                            вердикт.
                        </section>
                    )}

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

export default withRouter(DraftEditor);
