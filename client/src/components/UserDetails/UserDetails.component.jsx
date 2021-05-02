import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { USERS_PREFIX } from "utils/const/actionTypeAffixes";
import Spinner from "components/Spinner";
import UserPicture from "components/UserPicture";
import { defaultProps, propTypes } from "./UserDetails.props";
import { fetchUserStart } from "redux/users/users.actions";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectRelevantPendingAction } from "redux/ui/ui.selectors";
import { selectUserById } from "redux/users/users.selectors";
import styles from "./UserDetails.module.scss";

UserDetailsComponent.defaultProps = defaultProps;
UserDetailsComponent.propTypes = propTypes;

function UserDetailsComponent ({
    currentUser,
    history,
    isPending,
    match,
    onFetchUserStart,
    user
}) {
    const id = +match.params.id;

    const {
        createdAt,
        email,
        isAdmin,
        isConfirmed,
        profile,
        updatedAt
    } = user || {};

    const {
        about,
        birthdate,
        name,
        picture,
        lastActivityDate,
        totalVoteCount
    } = profile || {};

    useEffect(() => {
        onFetchUserStart(id);
    }, [id, onFetchUserStart]);

    const renderProfileSection = (key, value) => (value)
        ? (
            <Fragment>
                <div>{key}:</div>
                <div>{value}</div>
            </Fragment>
        )
        : null;

    if (isPending) {
        return <Spinner />;
    }

    return (
        <article className={styles.container}>
            <header className={styles.firstImpression}>
                <UserPicture
                    name={name}
                    picture={picture}
                    rootClassName={styles.picture}
                />

                <div className={styles.name}>
                    {name}
                    {isConfirmed && <span>&nbsp;(email не подтвержден)</span>}
                </div>
            </header>

            <section className={styles.profile}>
                {renderProfileSection("Email", email)}
                {renderProfileSection("Дата рождения", birthdate)}
                {renderProfileSection("Дата регистрации", createdAt)}
                {renderProfileSection("Число голосов", totalVoteCount)}
                {renderProfileSection("Пользователь о себе", about)}
            </section>
        </article>
    );
}

const mapStateToProps = () => {
    return (state, ownProps) => {
        const id = +ownProps.match.params.id;

        return ({
            currentUser: selectCurrentUser(state),
            isPending: Boolean(selectRelevantPendingAction(state, { actionPrefix: USERS_PREFIX })),
            user: selectUserById(state, id)
        });
    };
};

const mapDispatchToProps = (dispatch) => ({
    onFetchUserStart: (id) => dispatch(fetchUserStart(id))
});

const ConnectedUserDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserDetailsComponent);

export default withRouter(ConnectedUserDetails);
