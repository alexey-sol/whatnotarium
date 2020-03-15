import React from "react";

import { Bookmark as BookmarkIcon } from "components/common/Icon";
import IconButton from "components/BaseIconButton";
import { propTypes } from "../IconButton.props";

BookmarkIconButton.propTypes = propTypes;

function BookmarkIconButton ({ onClick, ...rest }) {
    return (
        <IconButton
            {...rest}
            onClick={onClick}
            title="Закладки"
        >
            <BookmarkIcon />
        </IconButton>
    );
}

export default BookmarkIconButton;
