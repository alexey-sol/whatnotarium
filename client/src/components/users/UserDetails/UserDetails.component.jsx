import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import * as p from "utils/const/pathnames";
import { USERS_PREFIX } from "utils/const/actionTypeAffixes";
import BaseButton from "components/ui/BaseButton";
import DateFormatter from "utils/formatters/DateFormatter";
import Spinner from "components/ui/Spinner";
import UserPicture from "components/ui/UserPicture";
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
        isConfirmed,
        profile
    } = user || {};

    const {
        about,
        birthdate,
        name,
        picture,
        lastActivityDate,
        totalVoteCount
    } = profile || {};

    const isMe = id === currentUser?.id;

    const formattedBirthdate = birthdate && new DateFormatter(birthdate).formatByPattern();
    const formattedCreatedAt = createdAt && new DateFormatter(createdAt).formatByPattern();
    const formattedLastActivityDate = lastActivityDate && new DateFormatter(lastActivityDate)
        .formatByPattern();

    useEffect(() => {
        onFetchUserStart(id);
    }, [id, onFetchUserStart]);

    const renderProfileSection = (key, value) => (value || typeof value === "number")
        ? (
            <Fragment>
                <div className={styles.infoBlock}>{key}:</div>
                <div className={styles.infoBlock}>{value}</div>
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
                    {!isConfirmed && <span>&nbsp;(email не подтвержден)</span>}
                </div>
            </header>

            <section className={styles.profile}>
                {renderProfileSection("Email", email)}
                {renderProfileSection("Дата рождения", formattedBirthdate)}
                {renderProfileSection("Дата регистрации", formattedCreatedAt)}
                {renderProfileSection("Число голосов", totalVoteCount)}
                {renderProfileSection("Пользователь о себе", about)}
                {renderProfileSection("Видели в последний раз", formattedLastActivityDate)}
            </section>

            {isMe && (
                <section className={styles.mySettings}>
                    <BaseButton
                        onClick={() => history.push(`/${p.PROFILE}/${p.SETTINGS}`)}
                        text="Изменить"
                    />
                </section>
            )}
        </article>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    isPending: (state, ownProps) => Boolean(selectRelevantPendingAction(state, {
        actionPrefix: USERS_PREFIX,
        prop: { id: +ownProps.match.params.id }
    })),
    user: (state, ownProps) => selectUserById(state, +ownProps.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
    onFetchUserStart: (id) => dispatch(fetchUserStart(id))
});

const ConnectedUserDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserDetailsComponent);

export default withRouter(ConnectedUserDetails);
