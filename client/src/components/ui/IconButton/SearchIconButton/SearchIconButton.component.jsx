import React from "react";

import { Search as SearchIcon } from "components/ui/Icon";
import IconButton from "components/ui/BaseIconButton";
import { defaultProps, propTypes } from "../IconButton.props";

SearchIconButton.defaultProps = defaultProps;
SearchIconButton.propTypes = propTypes;

function SearchIconButton ({ onClick, size, ...rest }) {
    return (
        <IconButton
            {...rest}
            onClick={onClick}
            size={size}
            title="Поиск"
        >
            <SearchIcon size={size} />
        </IconButton>
    );
}

export default SearchIconButton;
