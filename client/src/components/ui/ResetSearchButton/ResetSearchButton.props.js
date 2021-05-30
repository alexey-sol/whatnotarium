import { func, string } from "prop-types";

export const defaultProps = {
    title: "Сбросить поиск",
    to: "/"
};

export const propTypes = {
    onClick: func.isRequired,
    title: string,
    to: string
};
