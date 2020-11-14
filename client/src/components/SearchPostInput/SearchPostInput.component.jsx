import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import classnames from "classnames";

import { SEARCH_POSTS } from "utils/const/events";
import { defaultProps, propTypes } from "./SearchPostInput.props";
import { searchPostsStart } from "redux/posts/posts.actions";
import pubsub from "utils/pubsub";
import styles from "./SearchPostInput.module.scss";

SearchPostInput.defaultProps = defaultProps;
SearchPostInput.propTypes = propTypes;

function SearchPostInput ({
    history,
    location,
    onClose,
    onSearchPostsStart,
    rootClassName
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchIsInitiated, setSearchIsInitiated] = useState(false);

    const handleChange = ({ target }) => {
        if (!searchIsInitiated) {
            setSearchIsInitiated(true);
        }

        setSearchTerm(target.value);
    };

    const redirectToPostsIfNeeded = useCallback(() => {
        if (location.pathname !== "/") {
            history.push("/");
        }
    }, [history, location]);

    useEffect(() => {
        if (searchIsInitiated) {
            redirectToPostsIfNeeded();
            onSearchPostsStart(searchTerm);
        }
    }, [onSearchPostsStart, redirectToPostsIfNeeded, searchIsInitiated, searchTerm]);

    useEffect(() => {
        const handleKeydown = (event) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeydown);
        return () => document.removeEventListener("keydown", handleKeydown);
    }, [onClose]);

    useEffect(() => {
        if (searchIsInitiated) {
            pubsub.publish(SEARCH_POSTS, searchTerm);
        }
    }, [searchIsInitiated, searchTerm]);

    return (
        <div className={classnames(styles.container, rootClassName)}>
            <input
                autoComplete="off"
                autoFocus
                className={styles.input}
                maxLength={100}
                name="searchTerm"
                onBlur={onClose}
                onChange={handleChange}
                placeholder="Найти статью по названию, содержанию или имени автора"
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

export default withRouter(ConnectedSearchPostInput);
