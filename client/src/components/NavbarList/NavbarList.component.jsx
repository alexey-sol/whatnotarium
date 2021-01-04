import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { UNAPPROVED_POSTS, USERS } from "utils/const/pathnames";
import WritePostTab from "components/WritePostTab";
import { defaultProps, propTypes } from "./NavbarList.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import styles from "./NavbarList.module.scss";

Navbar.defaultProps = defaultProps;
Navbar.propTypes = propTypes;

function Navbar ({ currentUser, onClose }) {
    const userIsAuthed = Boolean(currentUser);
    const { isAdmin } = currentUser || {};

    return (
        <ul className={styles.container} onClick={onClose}>
            {userIsAuthed && !isAdmin && (
                <li className={styles.item}>
                    <WritePostTab classNameProminent={styles.prominentItem} />
                </li>
            )}

            {isAdmin && (
                <li className={styles.item}>
                    <Link
                        title="Статьи на проверку"
                        to={`/${UNAPPROVED_POSTS}`}
                    >
                        Статьи на проверку
                    </Link>
                </li>
            )}

            <li className={styles.item}>
                <Link
                    title="Статьи"
                    to="/"
                >
                    Статьи
                </Link>
            </li>

            <li className={styles.item}>
                <Link
                    title="Авторы"
                    to={`/${USERS}`}
                >
                    Авторы
                </Link>
            </li>
        </ul>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const ConnectedNavbar = connect(
    mapStateToProps
)(Navbar);

export default ConnectedNavbar;
