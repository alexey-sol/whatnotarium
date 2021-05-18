import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router";

import { CancelIconButton } from "components/ui/IconButton";
import { fetchUsersStart, searchUsersStart } from "redux/users/users.actions";
import { propTypes } from "./SearchUserInput.props";
import { selectCount } from "redux/usersPaging/usersPaging.selectors";
import styles from "./SearchUserInput.module.scss";

SearchUserInput.propTypes = propTypes;

function SearchUserInput ({
    onFetchUsersStart,
    onSearchUsersStart,
    usersOnPageCount
}) {
    const [searchIsInitiated, setSearchIsInitiated] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = ({ target }) => {
        if (!searchIsInitiated) {
            setSearchIsInitiated(true);
        }

        setSearchTerm(target.value);
    };

    const resetSearch = useCallback(() => onFetchUsersStart({
        count: usersOnPageCount,
        page: 1
    }, () => setSearchTerm("")), [onFetchUsersStart, usersOnPageCount]);

    const cancelButtonElem = (
        <CancelIconButton
            className={styles.cancelButton}
            onClick={resetSearch}
        />
    );

    useEffect(() => {
        if (searchIsInitiated) {
            onSearchUsersStart(searchTerm);
        }
    }, [onSearchUsersStart, searchIsInitiated, searchTerm]);

    return (
        <div className={styles.container}>
            <input
                autoComplete="off"
                className={styles.input}
                maxLength={100}
                name="searchTerm"
                onChange={handleChange}
                placeholder={"Найти автора по имени или по полю о \"себе\""}
                value={searchTerm}
            />

            {searchTerm.length > 0 && cancelButtonElem}
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    usersOnPageCount: selectCount
});

const mapDispatchToProps = (dispatch) => ({
    onFetchUsersStart: (options, cb) => dispatch(fetchUsersStart(options, cb)),
    onSearchUsersStart: (searchTerm) => dispatch(searchUsersStart(searchTerm))
});

const ConnectedSearchUserInput = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchUserInput);

export default withRouter(ConnectedSearchUserInput);
