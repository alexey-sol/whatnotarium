import React from "react";
import classnames from "classnames";

import { CloseIconButton } from "components/ui/IconButton";
import BaseOverlay from "components/ui/BaseOverlay";
import { defaultProps, propTypes } from "./BaseDialog.props";
import styles from "./BaseDialog.module.scss";

BaseDialog.defaultProps = defaultProps;
BaseDialog.propTypes = propTypes;

function BaseDialog ({
    children,
    className,
    onClose,
    title
}) {
    const containerClassName = classnames(
        styles.container,
        className
    );

    return (
        <BaseOverlay
            onClose={onClose}
            rootClassName={styles.root}
        >
            <section
                className={containerClassName}
                onClick={event => event.stopPropagation()}
            >
                <CloseIconButton
                    className={styles.closeIconButton}
                    onClick={onClose}
                    size={16}
                />

                {Boolean(title) && (
                    <div className={styles.title}>
                        {title}
                    </div>
                )}

                {children}
            </section>
        </BaseOverlay>
    );
}

export default BaseDialog;
