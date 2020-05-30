import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { defaultProps, propTypes } from "./Tooltip.props";
import classnames from "classnames";
import getPopupCoords from "utils/helpers/getPopupCoords";
import styles from "./Tooltip.module.scss";

Tooltip.defaultProps = defaultProps;
Tooltip.propTypes = propTypes;

const INITIAL_COORDS = {
    x: 0,
    y: 0
};

const tooltipWidthsInPx = {
    small: 60,
    medium: 120,
    large: 180
};

function Tooltip ({
    elemRef,
    isFixed,
    text,
    width
}) {
    const [coords, setCoords] = useState(INITIAL_COORDS);
    const [tooltipIsShown, setTooltipIsShown] = useState(false);

    const tooltipWidth = tooltipWidthsInPx[width];
    const { x, y } = coords;

    const positionStyle = {
        left: x,
        top: y
    };

    const tooltipClassName = classnames(
        styles.container,
        styles[`${width}Width`],
        (isFixed) ? styles.fixed : ""
    );

    const tooltipElem = (
        <div
            className={tooltipClassName}
            style={positionStyle}
        >
            <span className={styles.text}>
                {text}
            </span>
        </div>
    );

    useEffect(() => {
        const elem = elemRef?.current;

        if (elem) {
            const newCoords = getPopupCoords(elem, null, {
                popupWidth: tooltipWidth
            });

            setCoords(newCoords);
        }
    }, [elemRef, tooltipWidth]); // TODO: it's object

    useEffect(() => {
        const elem = elemRef?.current;
        const tooltipHasCoords = Boolean(x && y);

        if (elem && tooltipHasCoords) {
            const showTooltip = () => setTooltipIsShown(true);
            const hideTooltip = () => setTooltipIsShown(false);

            elem.addEventListener("mouseenter", showTooltip);
            elem.addEventListener("mouseleave", hideTooltip);

            return () => {
                elem.removeEventListener("mouseenter", showTooltip);
                elem.removeEventListener("mouseleave", hideTooltip);
            };
        }
    }, [elemRef, x, y]);

    const portal = ReactDOM.createPortal(
        tooltipElem,
        document.body
    );

    return (tooltipIsShown)
        ? portal
        : null;
}

export default Tooltip;
