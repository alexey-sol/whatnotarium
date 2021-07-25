import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import classnames from "classnames";

import { ERROR, SUCCESS } from "utils/const/notificationProps";
import Loader from "components/ui/Loader";
import Popup from "components/ui/Popup";
import { defaultProps, propTypes } from "./Main.props";
import { hideNotification } from "redux/ui/ui.actions";
import { selectIsPending } from "redux/ui/ui.selectors";
import { selectNotification } from "redux/ui/ui.selectors";
import styles from "./Main.module.scss";

Main.defaultProps = defaultProps;
Main.propTypes = propTypes;

function Main ({
    children,
    isPending,
    notification,
    onHideNotification
}) {
    const didErrorOccur = notification?.type === ERROR;
    const popupTheme = (didErrorOccur) ? ERROR : SUCCESS;

    const contentClassName = classnames(
        styles.content,
        (isPending) ? styles.hidden : styles.fadeIn
    );

    return (
        <main className={styles.container}>
            {isPending && <Loader />}

            <section className={contentClassName}>
                {children}
            </section>

            {Boolean(notification) && (
                <Popup
                    onClose={onHideNotification}
                    text={notification.text}
                    theme={popupTheme}
                    timeoutInMs={notification.timeoutInMs}
                />
            )}
        </main>
    );
}

const mapStateToProps = createStructuredSelector({
    isPending: selectIsPending,
    notification: selectNotification
});

const mapDispatchToProps = (dispatch) => ({
    onHideNotification: () => dispatch(hideNotification())
});

const ConnectedMain = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default ConnectedMain;
