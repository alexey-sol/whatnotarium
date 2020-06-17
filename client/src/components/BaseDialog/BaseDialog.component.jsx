import React from "react";
import classnames from "classnames";

import { CloseIconButton } from "components/IconButton";
import BaseOverlay from "components/BaseOverlay";
import { defaultProps, propTypes } from "./BaseDialog.props";
import styles from "./BaseDialog.module.scss";

BaseDialog.defaultProps = defaultProps;
BaseDialog.propTypes = propTypes;

function BaseDialog ({
    children,
    className,
    onClose,
    title,
    width
}) {
    const containerClassName = classnames(
        styles.container,
        styles[`${width}Width`],
        className
    );

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
                    size={16}
                />

                {title && (
                    <div className={styles.title}>
                        {title}
                    </div>
                )}

                {children}
            </div>
        </BaseOverlay>
    );
}

export default BaseDialog;
