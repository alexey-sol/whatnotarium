import React from "react";
import classnames from "classnames";

import { CloseIconButton } from "components/common/IconButton";
import { defaultProps, propTypes } from "./BaseDialog.props";
import BaseOverlay from "components/BaseOverlay";
import styles from "./BaseDialog.module.scss";

BaseDialog.propTypes = propTypes;
BaseDialog.defaultProps = defaultProps;

function BaseDialog ({ children, className, onClose, title, width }) {
    const containerClassName = classnames(
        styles.container,
        styles[`${width}Width`],
        className
    );

    // TODO: add back button

    return (
        <BaseOverlay
            onClose={onClose}
            rootClassName={styles.root}
        >
            <div
                className={containerClassName}
                onClick={event => event.stopPropagation()}
            >
                <CloseIconButton
                    className={styles.closeIconButton}
                    onClick={onClose}
                />

                {title && <div className={styles.title}>
                    {title}
                </div>}

                {children}
            </div>
        </BaseOverlay>
    );
}

export default BaseDialog;
