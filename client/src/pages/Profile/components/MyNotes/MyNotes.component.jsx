import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { propTypes } from "./MyNotes.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import styles from "./MyNotes.module.scss";

MyNotes.propTypes = propTypes;

function MyNotes ({ currentUser }) {
    return (
        <div className={styles.container}>
            Мои заметки
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const ConnectedMyNotes = connect(
    mapStateToProps
)(MyNotes);

export default ConnectedMyNotes;
