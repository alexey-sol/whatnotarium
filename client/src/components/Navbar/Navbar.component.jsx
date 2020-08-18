import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import classnames from "classnames";

import { DRAFT } from "utils/const/pathnames";
import { defaultProps, propTypes } from "./Navbar.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import styles from "./Navbar.module.scss";

Navbar.defaultProps = defaultProps;
Navbar.propTypes = propTypes;

function Navbar ({ currentUser }) {
    const userIsAuthed = Boolean(currentUser);

    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {userIsAuthed && (
                    <li className={classnames(styles.item, styles.prominent)}>
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
    currentUser: selectCurrentUser
});

const ConnectedNavbar = connect(
    mapStateToProps
)(Navbar);

export default ConnectedNavbar;
