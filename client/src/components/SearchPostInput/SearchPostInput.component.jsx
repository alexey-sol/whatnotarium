import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import { propTypes } from "./SearchPostInput.props";
import { searchPostsStart } from "redux/posts/posts.actions";
import styles from "./SearchPostInput.module.scss";

SearchPostInput.propTypes = propTypes;

function SearchPostInput ({ onSearchPostsStart, rootClassName }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = ({ target }) => {
        setSearchTerm(target.value);
    };

    useEffect(() => {
        console.log(searchTerm);
        onSearchPostsStart(searchTerm);
    }, [onSearchPostsStart, searchTerm]);

    return (
        <div className={classnames(styles.container, rootClassName)}>
            <input
                className={styles.input}
                maxLength={100}
                name="searchTerm"
                onChange={handleChange}
                value={searchTerm}
            />

        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    onSearchPostsStart: (searchTerm) => dispatch(searchPostsStart(searchTerm))
});

const ConnectedSearchPostInput = connect(
    null,
    mapDispatchToProps
)(SearchPostInput);

export default ConnectedSearchPostInput;
