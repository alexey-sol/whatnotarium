import React, { useCallback, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import classnames from "classnames";

import { SEARCH_POSTS } from "utils/const/events";
import SearchPrompt from "components/ui/SearchPrompt";
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
    const rootRef = useRef(null);

    const redirectToPostsIfNeeded = useCallback(() => {
        if (location.pathname !== "/") {
            history.push("/");
        }
    }, [history, location]);

    const {
        hasNewSearchTerm,
        onSearch,
        searchTerm,
        setSearchTerm
    } = useSearch({
        cbOnSubmit: (isCompactView) ? onClose : null,
        onSetCurrentPage,
        redirectToSearchPage: redirectToPostsIfNeeded,
        searchEventName: SEARCH_POSTS,
        searchRecords: onSearchPostsStart
    });

    const handleClickOnPrompt = () => onSearch();

    useEffect(() => {
        const handleClick = ({ target }) => {
            const isClickOutside = !rootRef.current.contains(target);

            if (isClickOutside) {
                onClose();
            }
        };

        const handleKeydown = (event) => {
            if (onClose && event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeydown);
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("keydown", handleKeydown);
            document.removeEventListener("click", handleClick);
        };
    }, [onClose]);

    const placeholder = (isCompactView)
        ? "Найти статью"
        : "Найти статью по названию, содержанию или имени автора";

    return (
        <div className={classnames(styles.container, rootClassName)} ref={rootRef}>
            <input
                autoComplete="off"
                autoFocus={!isCompactView} // eslint-disable-line
                className={styles.input}
                maxLength={100}
                name="searchTerm"
                onChange={({ target }) => setSearchTerm(target.value)}
                placeholder={placeholder}
                value={searchTerm}
            />

            {hasNewSearchTerm && !isCompactView && (
                <div className={styles.searchPrompt}>
                    <SearchPrompt onClick={handleClickOnPrompt} title="Найти статью" />
                </div>
            )}
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
