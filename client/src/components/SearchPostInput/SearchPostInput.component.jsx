import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import classnames from "classnames";

import { RESET_SEARCH_POSTS } from "utils/const/events";
import { propTypes } from "./SearchPostInput.props";
import { searchPostsStart } from "redux/posts/posts.actions";
import pubsub from "utils/pubsub";
import styles from "./SearchPostInput.module.scss";

SearchPostInput.propTypes = propTypes;

function SearchPostInput ({
    history,
    location,
    onClose,
    onSearchPostsStart,
    rootClassName
}) {
    const [searchIsInitiated, setSearchIsInitiated] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

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
            pubsub.publish(RESET_SEARCH_POSTS);
        }
    }, [searchIsInitiated]);

    return (
        <div className={classnames(styles.container, rootClassName)}>
            <input
                autoFocus
                className={styles.input}
                maxLength={100}
                name="searchTerm"
                onBlur={onClose}
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

export default withRouter(ConnectedSearchPostInput);
