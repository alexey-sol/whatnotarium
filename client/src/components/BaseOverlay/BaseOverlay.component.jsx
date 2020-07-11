import React, { memo, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";

import { defaultProps, propTypes } from "./BaseOverlay.props";
import styles from "./BaseOverlay.module.scss";

BaseOverlay.defaultProps = defaultProps;
BaseOverlay.propTypes = propTypes;

function BaseOverlay ({ children, onClose, rootClassName }) {
    const rootRef = useRef(null);

    const handleMouseDownOnRoot = (event) => {
        const targetIsRoot = event.target === rootRef.current;
        if (targetIsRoot) onClose();
    };

    const overlayElem = (
        <section
            className={classnames(rootClassName, styles.root)}
            onMouseDown={handleMouseDownOnRoot}
            ref={rootRef}
        >
            {children}
        </section>
    );

    useEffect(() => {
        const handleKeydown = (event) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeydown);
        return () => document.removeEventListener("keydown", handleKeydown);
    }, [onClose]);

    return ReactDOM.createPortal(
        overlayElem,
        document.body
    );
}

export default memo(BaseOverlay);
