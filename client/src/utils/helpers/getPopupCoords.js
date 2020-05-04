function getPopupCoords (
    anchorElement,
    popupElement,
    options = {}
) {
    const {
        gapBetweenElementAndPopup = 5,
        popupWidth = getOffsetWidth(popupElement)
    } = options;

    const elementBounds = anchorElement.getBoundingClientRect();

    const {
        height,
        width,
        x,
        y
    } = elementBounds;

    const calculatedX = x + width / 2 - popupWidth / 2;
    const calculatedY = y + height + gapBetweenElementAndPopup;

    return {
        x: calculatedX,
        y: calculatedY
    };
}

export default getPopupCoords;

function getOffsetWidth (element) {
    return (element)
        ? element.offsetWidth
        : 0;
}
