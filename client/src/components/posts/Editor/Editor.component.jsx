import { Editor as MceEditor } from "@tinymce/tinymce-react";
import React from "react";

import { defaultProps, propTypes } from "./Editor.props";

const tinyApiKey = process.env.REACT_APP_TINY_API_KEY;

Editor.defaultProps = defaultProps;
Editor.propTypes = propTypes;

function Editor ({ content, handleChange, setEditor }) {
    return (
        <MceEditor
            apiKey={tinyApiKey}
            initialValue={content}
            init={getMceEditorInitOptions(setEditor)}
            onEditorChange={handleChange}
            textareaName="body"
        />
    );
}

export default Editor;

function getMceEditorInitOptions (setEditor) {
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
        mobile: {
            toolbar_drawer: "floating"
        },
        plugins,
        resize: false,
        setup: (editor) => editor.on("init", () => setEditor(editor)),
        statusbar: false,
        toolbar
    };
}
