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
    hasManualEnter,
    history,
    location,
    onClose,
    onSearchPostsStart,
    rootClassName
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchIsInitiated, setSearchIsInitiated] = useState(false);

    const redirectToPostsIfNeeded = useCallback(() => {
        if (location.pathname !== "/") {
            history.push("/");
        }
    }, [history, location]);

    useEffect(() => {
        if (hasManualEnter) return;

        const shouldInitSearching = !searchIsInitiated && searchTerm.length > 0;

        if (searchIsInitiated) {
            redirectToPostsIfNeeded();
            pubsub.publish(SEARCH_POSTS, searchTerm);
            onSearchPostsStart(searchTerm);
        } else if (shouldInitSearching) {
            setSearchIsInitiated(true);
        }
    }, [
        hasManualEnter,
        onSearchPostsStart,
        redirectToPostsIfNeeded,
        searchIsInitiated,
        searchTerm
    ]);

    useEffect(() => {
        if (hasManualEnter) {
            const handleKeydown = (event) => {
                if (event.key === "Enter") {
                    redirectToPostsIfNeeded();
                    pubsub.publish(SEARCH_POSTS, searchTerm);
                    onSearchPostsStart(searchTerm, () => setSearchIsInitiated(true));
                    onClose();
                }
            };

            document.removeEventListener("keydown", handleKeydown);
            document.addEventListener("keydown", handleKeydown);

            return () => document.removeEventListener("keydown", handleKeydown);
        } else {
            const handleKeydown = (event) => {
                if (event.key === "Escape") onClose();
            };

            document.removeEventListener("keydown", handleKeydown);
            document.addEventListener("keydown", handleKeydown);

            return () => document.removeEventListener("keydown", handleKeydown);
        }
    }, [
        hasManualEnter,
        onClose,
        onSearchPostsStart,
        redirectToPostsIfNeeded,
        searchTerm
    ]);

    const placeholder = (hasManualEnter)
        ? "Найти статью"
        : "Найти статью по названию, содержанию или имени автора";

    return (
        <div className={classnames(styles.container, rootClassName)}>
            <input
                autoComplete="off"
                autoFocus={!hasManualEnter}
                className={styles.input}
                maxLength={100}
                name="searchTerm"
                onBlur={(hasManualEnter) ? null : onClose}
                onChange={({ target }) => setSearchTerm(target.value)}
                placeholder={placeholder}
                value={searchTerm}
            />
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    onSearchPostsStart: (searchTerm, cb) => dispatch(searchPostsStart(searchTerm, cb))
});

const ConnectedSearchPostInput = connect(
    null,
    mapDispatchToProps
)(SearchPostInput);

export default withRouter(ConnectedSearchPostInput);
