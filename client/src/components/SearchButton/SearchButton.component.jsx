import React from "react";

import { Search } from "components/common/Icon";
import IconButton from "components/common/IconButton";
import { propTypes } from "./SearchButton.props";

SearchButton.propTypes = propTypes;

function SearchButton ({ onClick }) {
    return (
        <IconButton onClick={onClick}>
            <Search />
        </IconButton>
    );
}

export default SearchButton;
