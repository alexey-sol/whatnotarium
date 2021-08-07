import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import * as p from "utils/const/pathnames";
import { SEARCH_USERS } from "utils/const/events";
import ResetSearchButton from "components/ui/ResetSearchButton";
import SearchPrompt from "components/ui/SearchPrompt";
import { searchUsersStart } from "redux/users/users.actions";
import { propTypes } from "./SearchUserInput.props";
import { setCurrentPage } from "redux/usersPaging/usersPaging.actions";
import styles from "./SearchUserInput.module.scss";
import useSearch from "utils/hooks/useSearch";

SearchUserInput.propTypes = propTypes;

function SearchUserInput ({ onSearchUsersStart, onSetCurrentPage }) {
    const {
        hasNewSearchTerm,
        onSearch,
        prevSearchTerm,
        resetSearch,
        searchTerm,
        setSearchTerm
    } = useSearch({
        onSetCurrentPage,
        searchEventName: SEARCH_USERS,
        searchRecords: onSearchUsersStart
    });

    const handleClickOnPrompt = () => onSearch();

    const submittedSearch = prevSearchTerm.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.inputContainer}>
                <input
                    autoComplete="off"
                    className={styles.input}
                    maxLength={100}
                    name="searchTerm"
                    onChange={({ target }) => setSearchTerm(target.value)}
                    placeholder={"Найти автора по имени или по полю о \"себе\""}
                    value={searchTerm}
                />

                {hasNewSearchTerm && (
                    <div className={styles.searchPrompt}>
                        <SearchPrompt onClick={handleClickOnPrompt} title="Найти пользователя" />
                    </div>
                )}
            </div>

            {submittedSearch && (
                <div className={styles.resetSearchButton}>
                    <ResetSearchButton onClick={resetSearch} to={`/${p.USERS}`} />
                </div>
            )}
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    onSearchUsersStart: (props, cb) => dispatch(searchUsersStart(props, cb)),
    onSetCurrentPage: (page) => dispatch(setCurrentPage(page))
});

const ConnectedSearchUserInput = connect(
    null,
    mapDispatchToProps
)(SearchUserInput);

export default withRouter(ConnectedSearchUserInput);
