function getPopupCoords (
    anchorElem,
    popupElem,
    options = {}
) {
    const {
        gapBetweenElemAndPopup = 5,
        popupWidth = getOffsetWidth(popupElem)
    } = options;

    const elemBounds = anchorElem.getBoundingClientRect();

    const {
        height,
        width,
        x,
        y
    } = elemBounds;

    const calculatedX = x + width / 2 - popupWidth / 2;
    const calculatedY = y + height + gapBetweenElemAndPopup;

    return {
        x: calculatedX,
        y: calculatedY
    };
}

export default getPopupCoords;

function getOffsetWidth (elem) {
    return (elem)
        ? elem.offsetWidth
        : 0;
}
