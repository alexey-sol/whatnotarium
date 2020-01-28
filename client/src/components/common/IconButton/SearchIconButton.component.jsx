import React from "react";

import { Search as SearchIcon } from "components/common/Icon";
import IconButton from "components/BaseIconButton";
import { propTypes } from "./IconButton.props";

SearchIconButton.propTypes = propTypes;

function SearchIconButton ({ onClick, ...rest }) {
    return (
        <IconButton
            {...rest}
            onClick={onClick}
        >
            <SearchIcon />
        </IconButton>
    );
}

export default SearchIconButton;
