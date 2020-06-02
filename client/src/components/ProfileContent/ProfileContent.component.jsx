import React, { useState } from "react";
import classnames from "classnames";

import Activity from "./components/Activity";
import MyArticles from "./components/MyArticles";
import MyNotes from "./components/MyNotes";
import Popup from "components/Popup";
import Settings from "./components/Settings";
import styles from "./ProfileContent.module.scss";
import { defaultProps, propTypes } from "./ProfileContent.component.props";

const tabNames = [
    "Активность",
    "Мои статьи",
    "Мои заметки",
    "Настройки"
];

ProfileContent.defaultProps = defaultProps;
ProfileContent.propTypes = propTypes;

function ProfileContent ({
    hidePopup,
    popupText,
    popupTheme
}) {
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

    const tabIsActivity = currentTab === tabNames[0];
    const tabIsMyArticles = currentTab === tabNames[1];
    const tabIsMyNotes = currentTab === tabNames[2];
    const tabIsSettings = currentTab === tabNames[3];

    const popupIsShown = Boolean(popupText);

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

            {popupIsShown && (
                <Popup
                    onClose={hidePopup}
                    text={popupText}
                    theme={popupTheme}
                />
            )}
        </div>
    );
}

export default ProfileContent;
