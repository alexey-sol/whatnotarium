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

const SEARCH_TEXT_SHORT = "Найти статью";
const SEARCH_TEXT_EXPANDED = "Найти статью по названию, содержанию или имени автора";

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

    const redirectToHomeIfNeeded = useCallback(() => {
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
        redirectToSearchPage: redirectToHomeIfNeeded,
        searchEventName: SEARCH_POSTS,
        searchRecords: onSearchPostsStart
    });

    useEffect(() => {
        const handleClick = ({ target }) => {
            const clickedOutside = !rootRef.current.contains(target);
            if (clickedOutside) onClose();
        };

        const handleKeydown = (event) => {
            const pressedCancel = event.key === "Escape";
            if (pressedCancel) onClose();
        };

        document.addEventListener("keydown", handleKeydown);
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("keydown", handleKeydown);
            document.removeEventListener("click", handleClick);
        };
    }, [onClose]);

    const inputPlaceholder = (isCompactView)
        ? SEARCH_TEXT_SHORT
        : SEARCH_TEXT_EXPANDED;

    const shouldRenderSearchButton = hasNewSearchTerm && !isCompactView;

    return (
        <div className={classnames(styles.container, rootClassName)} ref={rootRef}>
            <input
                autoComplete="off"
                autoFocus={!isCompactView} // eslint-disable-line
                className={styles.input}
                maxLength={100}
                name="searchTerm"
                onChange={({ target }) => setSearchTerm(target.value)}
                placeholder={inputPlaceholder}
                value={searchTerm}
            />

            {shouldRenderSearchButton && (
                <div className={styles.searchPrompt}>
                    <SearchPrompt
                        onClick={() => onSearch()}
                        title={SEARCH_TEXT_SHORT}
                    />
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
