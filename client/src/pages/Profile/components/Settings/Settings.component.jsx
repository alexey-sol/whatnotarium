import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { updateProfileStart } from "redux/user/user.actions";

import { defaultProps, propTypes } from "./Settings.props";
import { selectCurrentUser } from "redux/user/user.selectors";
import styles from "./Settings.module.scss";

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;

function Settings ({ currentUser, updateProfileStart }) {
    return (
        <div className={styles.container}>
            Настройки
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
    updateProfileStart: (params) => dispatch(updateProfileStart(params))
});

const ConnectedSettings = connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);

export default ConnectedSettings;
