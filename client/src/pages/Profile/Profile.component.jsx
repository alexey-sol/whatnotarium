import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import classnames from "classnames";

import Activity from "./components/Activity";
import MyArticles from "./components/MyArticles";
import MyNotes from "./components/MyNotes";
import Popup from "components/Popup";
import Settings from "./components/Settings";
import { defaultProps, propTypes } from "./Profile.props";
import { createPostReset, deletePostReset } from "redux/post/post.actions";
import { selectCreatedPost, selectDeletedPost } from "redux/post/post.selectors";
import styles from "./Profile.module.scss";

const tabNames = [
    "Активность",
    "Мои статьи",
    "Мои заметки",
    "Настройки"
];

Profile.defaultProps = defaultProps;
Profile.propTypes = propTypes;

function Profile ({
    createdPost,
    deletedPost,
    onCreatePostReset,
    onDeletePostReset
}) {
    const [currentTab, setCurrentTab] = useState(tabNames[0]);

    const clearState = useCallback(() => {
        onCreatePostReset();
        onDeletePostReset();
    }, [onCreatePostReset, onDeletePostReset]);

    useEffect(() => {
        return () => clearState();
    }, [clearState]);

    const tabs = tabNames.map((tabName, index) => (
        <li
            className={classnames(
                styles.tab,
                (tabName === currentTab) ? styles.active : ""
            )}
            key={index} // eslint-disable-line
            onClick={() => setCurrentTab(tabName)}
        >
            <span className={styles.tabTitle}>
                {tabName}
            </span>
        </li>
    ));

    const tabIsActivity = currentTab === tabNames[0];
    const tabIsMyArticles = currentTab === tabNames[1];
    const tabIsMyNotes = currentTab === tabNames[2];
    const tabIsSettings = currentTab === tabNames[3];

    const creationIsSucceeded = Boolean(createdPost);
    const deletionIsSucceeded = Boolean(deletedPost);

    return (
        <div className={styles.container}>
            <ul className={styles.tabsList}>
                {tabs}
            </ul>

            <div className={styles.tabContent}>
                {tabIsActivity && <Activity />}
                {tabIsMyArticles && <MyArticles />}
                {tabIsMyNotes && <MyNotes />}
                {tabIsSettings && <Settings />}
            </div>

            {creationIsSucceeded && (
                <Popup
                    onClose={clearState}
                    text="Статья сохранена успешно"
                    theme="success"
                />
            )}

            {deletionIsSucceeded && (
                <Popup
                    onClose={clearState}
                    text="Статья удалена"
                    theme="success"
                />
            )}
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    createdPost: selectCreatedPost,
    deletedPost: selectDeletedPost
});

const mapDispatchToProps = (dispatch) => ({
    onCreatePostReset: () => dispatch(createPostReset()),
    onDeletePostReset: () => dispatch(deletePostReset())
});

const ConnectedProfile = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

export default ConnectedProfile;
