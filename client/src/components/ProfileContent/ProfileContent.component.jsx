import React, { useState } from "react";
import classnames from "classnames";

import Activity from "./components/Activity";
import MyArticles from "./components/MyArticles";
import MyNotes from "./components/MyNotes";
import Settings from "./components/Settings";
import { propTypes } from "./ProfileContent.component.props";
import styles from "./ProfileContent.module.scss";

const tabNames = [
    "Активность",
    "Мои статьи",
    "Мои заметки",
    "Настройки"
];

ProfileContent.propTypes = propTypes;

function ProfileContent ({ currentUser }) {
    const [currentTab, setCurrentTab] = useState(tabNames[0]);

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

    const activityIsSelected = currentTab === tabNames[0];
    const myArticlesIsSelected = currentTab === tabNames[1];
    const myNotesIsSelected = currentTab === tabNames[2];
    const settingsIsSelected = currentTab === tabNames[3];

    return (
        <div className={styles.container}>
            <ul className={styles.tabsList}>
                {tabs}
            </ul>

            <div className={styles.tabContent}>
                {activityIsSelected && <Activity />}
                {myArticlesIsSelected && <MyArticles currentUser={currentUser} />}
                {myNotesIsSelected && <MyNotes />}
                {settingsIsSelected && <Settings />}
            </div>
        </div>
    );
}

export default ProfileContent;
