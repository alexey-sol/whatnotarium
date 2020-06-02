import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import classnames from "classnames";

import { DRAFT } from "utils/const/pathnames";
import { defaultProps, propTypes } from "./Navbar.props";
import { findAffectedPost } from "redux/post/post.selectors";
import { selectCurrentUser } from "redux/session/session.selectors";
import styles from "./Navbar.module.scss";

Navbar.defaultProps = defaultProps;
Navbar.propTypes = propTypes;

function Navbar ({ affectedPost, currentUser }) {
    const isAuthed = Boolean(currentUser);
    const writePostIsDisabled = Boolean(affectedPost.item);

    const writePostItemClassName = classnames(
        styles.item,
        styles.prominent,
        (writePostIsDisabled) ? styles.disabled : ""
    );

    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {isAuthed && (
                    <li className={writePostItemClassName}>
                        <Link
                            title="Написать статью"
                            to={DRAFT}
                        >
                            Написать статью
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
                        title="Заметки"
                        to="/notes"
                    >
                        Заметки
                    </Link>
                </li>

                <li className={styles.item}>
                    <Link
                        title="Авторы"
                        to="/authors"
                    >
                        Авторы
                    </Link>
                </li>
            </ul>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    affectedPost: findAffectedPost,
    currentUser: selectCurrentUser
});

const ConnectedNavbar = connect(
    mapStateToProps
)(Navbar);

export default ConnectedNavbar;
