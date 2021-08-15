import React from "react";
import classnames from "classnames";

import { UserPicturePlaceholder } from "components/ui/Icon";
import { defaultProps, propTypes } from "./UserPicture.props";
import styles from "./UserPicture.module.scss";
import toBase64 from "utils/helpers/toBase64";

UserPicture.defaultProps = defaultProps;
UserPicture.propTypes = propTypes;

function UserPicture ({
    name,
    onClick,
    picture,
    rootClassName
}) {
    const classNames = classnames(styles.container, rootClassName);
    const hasValidPicture = picture?.data?.length > 0;

    const picDataIfAny = (hasValidPicture)
        ? `data:image/jpeg;base64,${toBase64(picture.data)}`
        : null;

    return (
        <div className={classNames}>
            {(hasValidPicture)
                ? <img alt={name} onClick={onClick} src={picDataIfAny} title={name} />
                : <UserPicturePlaceholder fill="#455a64" size={50} />}
        </div>
    );
}

export default UserPicture;
