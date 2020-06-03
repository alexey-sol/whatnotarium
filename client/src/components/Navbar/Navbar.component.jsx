import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import classnames from "classnames";

import { DRAFT } from "utils/const/pathnames";
import { defaultProps, propTypes } from "./Navbar.props";

import {
    selectCreatedPost,
    selectDeletedPost,
    selectUpdatedPost
} from "redux/post/post.selectors";

import { selectCurrentUser } from "redux/session/session.selectors";
import findModifiedStateItem from "utils/redux/findModifiedStateItem";
import styles from "./Navbar.module.scss";

Navbar.defaultProps = defaultProps;
Navbar.propTypes = propTypes;

function Navbar ({
    createdPost,
    currentUser,
    deletedPost,
    updatedPost
}) {
    const isAuthed = Boolean(currentUser);
    const modifiedPost = findModifiedStateItem(createdPost, deletedPost, updatedPost);
    const shouldDisableWritePost = Boolean(modifiedPost.item);

    const writePostItemClassName = classnames(
        styles.item,
        styles.prominent,
        (shouldDisableWritePost) ? styles.disabled : ""
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
    createdPost: selectCreatedPost,
    currentUser: selectCurrentUser,
    deletedPost: selectDeletedPost,
    updatedPost: selectUpdatedPost
});

const ConnectedNavbar = connect(
    mapStateToProps
)(Navbar);

export default ConnectedNavbar;
