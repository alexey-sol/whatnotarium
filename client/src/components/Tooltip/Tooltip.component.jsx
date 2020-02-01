import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { defaultProps, propTypes } from "./Tooltip.props";
import classnames from "classnames";
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

function Tooltip ({ elementRef, isFixed, text, width }) {
    const [coords, setCoords] = useState(INITIAL_COORDS);
    const [element, setElement] = useState(elementRef.current);

    const { x, y } = coords;
    const tooltipWidth = tooltipWidthsInPx[width];

    const dynamicStyle = {
        left: x,
        top: y
    };

    const tooltipClassName = classnames(
        styles.container,
        styles[`${width}Width`],
        (isFixed) ? styles.fixed : ""
    );

    const tooltipElement = (
        <div
            className={tooltipClassName}
            style={dynamicStyle}
        >
            <span className={styles.text}>
                {text}
            </span>
        </div>
    );

    const onMouseEnter = () => {
        const elementBounds = element.getBoundingClientRect();
        const { height, width, x, y } = elementBounds;
        const gapBetweenElementAndTooltip = 7;

        const calculatedX = x + width / 2 - tooltipWidth / 2;
        const calculatedY = y + height + gapBetweenElementAndTooltip;

        setCoords({
            x: calculatedX,
            y: calculatedY
        });
    };

    const onMouseLeave = () => setCoords(INITIAL_COORDS);

    useEffect(() => {
        const element = elementRef.current;

        if (!element) {
            return;
        }

        setElement(element);

        element.addEventListener("mouseenter", onMouseEnter);
        element.addEventListener("mouseleave", onMouseLeave);

        return () => {
            element.removeEventListener("mouseenter", onMouseEnter);
            element.removeEventListener("mouseleave", onMouseLeave);
        };
    }, [element]);

    const tooltipIsShown = x && y;

    const elementToRender = (tooltipIsShown)
        ? tooltipElement
        : null;

    return ReactDOM.createPortal(
        elementToRender,
        document.body
    );
}

export default Tooltip;
