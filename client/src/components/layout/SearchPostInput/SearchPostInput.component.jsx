import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import classnames from "classnames";

import { SEARCH_POSTS } from "utils/const/events";
import { defaultProps, propTypes } from "./SearchPostInput.props";
import { searchPostsStart } from "redux/posts/posts.actions";
import { setCurrentPage } from "redux/postsPaging/postsPaging.actions";
import useSearch from "utils/hooks/useSearch";
import styles from "./SearchPostInput.module.scss";

SearchPostInput.defaultProps = defaultProps;
SearchPostInput.propTypes = propTypes;

function SearchPostInput ({
    history,
    isCompactView,
    location,
    onClose,
    onSearchPostsStart,
    onSetCurrentPage,
    rootClassName
}) {
    const redirectToPostsIfNeeded = useCallback(() => {
        if (location.pathname !== "/") {
            history.push("/");
        }
    }, [history, location]);

    const {
        searchOnTyping,
        searchTerm,
        setSearchTerm
    } = useSearch({
        cbOnSubmit: (isCompactView) ? onClose : null,
        onSetCurrentPage,
        redirectToSearchPage: redirectToPostsIfNeeded,
        searchEventName: SEARCH_POSTS,
        searchRecords: onSearchPostsStart
    });

    useEffect(() => {
        const handleKeydown = (event) => {
            if (onClose && event.key === "Escape") {
                onClose();
            }
        };

        document.removeEventListener("keydown", handleKeydown);
        document.addEventListener("keydown", handleKeydown);

        return () => document.removeEventListener("keydown", handleKeydown);
    }, [onClose]);

    const placeholder = (isCompactView)
        ? "Найти статью"
        : "Найти статью по названию, содержанию или имени автора";

    return (
        <div className={classnames(styles.container, rootClassName)}>
            <input
                autoComplete="off"
                autoFocus={!isCompactView} // eslint-disable-line
                className={styles.input}
                maxLength={100}
                name="searchTerm"
                onBlur={(isCompactView) ? null : onClose}
                onChange={({ target }) => setSearchTerm(target.value)}
                onKeyUp={searchOnTyping}
                placeholder={placeholder}
                value={searchTerm}
            />
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    onSearchPostsStart: (props, cb) => dispatch(searchPostsStart(props, cb)),
    onSetCurrentPage: (page) => dispatch(setCurrentPage(page))
});

const ConnectedSearchPostInput = connect(
    null,
    mapDispatchToProps
)(SearchPostInput);

export default withRouter(ConnectedSearchPostInput);
