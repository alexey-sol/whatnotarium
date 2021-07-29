import { Link, withRouter } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { DRAFT, POST, USERS } from "utils/const/pathnames";
import NavbarTab from "components/layout/NavbarTab";
import WritePostTab from "components/layout/WritePostTab";
import { defaultProps, propTypes } from "./NavbarList.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import styles from "./NavbarList.module.scss";

Navbar.defaultProps = defaultProps;
Navbar.propTypes = propTypes;

function Navbar ({ currentUser, location, onClose }) {
    const userIsAuthed = Boolean(currentUser);
    const { isAdmin } = currentUser || {};

    const articlesButtonTitle = (isAdmin)
        ? "Статьи на проверку"
        : "Статьи";

    const draftSelected = location.pathname.startsWith(`/${DRAFT}`);
    const authorsSelected = location.pathname.startsWith(`/${USERS}`);
    const somethingOtherSelected = !draftSelected && !authorsSelected;
    const postsSelected = location.pathname.startsWith(`/${POST}`) || somethingOtherSelected;

    const allowedToWritePosts = userIsAuthed && !isAdmin;

    return (
        <ul className={styles.container} onClick={onClose}>
            <NavbarTab isActive={postsSelected}>
                <Link title={articlesButtonTitle} to="/">
                    {articlesButtonTitle}
                </Link>
            </NavbarTab>

            <NavbarTab isActive={authorsSelected}>
                <Link title="Авторы" to={`/${USERS}`}>
                    Авторы
                </Link>
            </NavbarTab>

            {allowedToWritePosts && (
                <NavbarTab isActive={draftSelected} className={styles.writePostTab}>
                    <WritePostTab />
                </NavbarTab>
            )}
        </ul>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const ConnectedNavbar = connect(
    mapStateToProps
)(Navbar);

export default withRouter(ConnectedNavbar);
