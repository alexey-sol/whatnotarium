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
        <div
            className={classnames(rootClassName, styles.root)}
            onMouseDown={handleMouseDownOnRoot}
            ref={rootRef}
        >
            {children}
        </div>
    );

    useEffect(() => {
        const onKeydown = (event) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", onKeydown);
        return () => document.removeEventListener("keydown", onKeydown);
    }, [onClose]);

    return ReactDOM.createPortal(
        overlayElem,
        document.body
    );
}

export default memo(BaseOverlay);
